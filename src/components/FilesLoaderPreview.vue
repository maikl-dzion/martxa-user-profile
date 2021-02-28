<template>
  <div>
    <input type="file" id="files" ref="files" multiple
           @change="handleFilesUpload()" style="display: none"/>
    <div class="mb-10 about-wrap user-menu">
      <h5 class="" style="font-size: 13px; font-style: italic">Загрузка файлов</h5>
    </div>

    <div>
      <button
          @click="selectFiles()" class="cont-submit btn-contact btn-style" name="button"
          style="border: 1px gainsboro solid; width: 140px;
                 height: 35px; padding:3px; font-size:12px !important;"
      > Выбрать файлы </button>
<!--      <button @click="submitFilesToServer()"-->
<!--              class="cont-submit btn-contact btn-style" name="button" style="margin-left: 20px; border: 1px gainsboro solid"> Загрузить на сервер-->
<!--      </button>-->
    </div>
    <br/>

    <div v-if="files.length" class="mb-10 about-wrap user-menu">
      <h5 class="sidebar-title" style="font-size: 15px;" >Предпросмотр</h5>
    </div>

    <div class="row">
      <div class="col-md-12 col-sm-6 col-xs-12 col">
        <div class="footer-widget instagram-wrap">
          <ul><li v-for="(file, key) in files" style="width:132px;">
              <a href="#"> <img :ref="'image-' + parseInt(key)"
                                :alt="file.name" class="img-preview" style="width:100%;"></a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div>
      <hr>
    </div>

  </div>
</template>

<script>

export default {
  props: ['type', 'id'],
  data () {
    return {
      filesFolderName: '',
      files: []
    }
  },

  created () {
  },

  methods: {

    selectFiles () {
      this.$refs.files.click()
    },

    handleFilesUpload () {
      let uploadedFiles = this.$refs.files.files
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i])
      }
      const emitFiles = this.filesFormatter()
      this.$emit('get_files_load', emitFiles)
      this.getImagesPreview()
    },

    getImagesPreview () {
        for (let i = 0; i < this.files.length; i++) {
          // if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
          let reader = new FileReader()
          reader.addEventListener('load', function () {
            this.$refs['image-' + parseInt(i)][0].src = reader.result
          }.bind(this), false)
          reader.readAsDataURL(this.files[i])
          // }
        }
    },

    // Отправка файлов на сервер
    submitFilesToServer () {
        let formData = new FormData()
        formData.append('folder_name', this.filesFolderName)
        for (var i = 0; i < this.files.length; i++) {
          let file = this.files[i]
          formData.append('files[' + i + ']', file)
        }
        const apiUrl = '/post/upload-files/' + this.type+ '/' + this.uid
        this.send(apiUrl, 'post', formData).then(response => {
           this.files = []
           this.$emit('files_load', response)
        })
    },

    filesFormatter() {
        let files = this.files
        const length = files.length
        let formData = new FormData()
        for (var i = 0; i < length; i++) {
            let file = files[i]
            formData.append('files[' + i + ']', file)
        }
        return formData;
    }

  } // --- methods

}
</script>

<style>

input[type="file"] {
  position: absolute;
  top: -500px;
}
.img-preview {
  width: 100%;
}

</style>

