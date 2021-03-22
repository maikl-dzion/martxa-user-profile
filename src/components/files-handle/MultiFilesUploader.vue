<template>
  <div>

    <Preloading
      :preloader="preloaderState"
      :message="preloaderStateMessage"
    ></Preloading>

    <input type="file" id="files" ref="files" multiple @change="handleFilesUpload()"/>

    <div class="mb-10 about-wrap user-menu">
      <h5 class="sidebar-title">Загрузка файлов</h5>
    </div>

    <div class="faq-form form-style">
      <input v-model="filesFolderName" type="text" placeholder="Имя папки" style="width: 440px">
    </div>

    <div>
      <button @click="selectFiles()"
              class="cont-submit btn-contact btn-style" name="button" style="border: 1px gainsboro solid" > Выбрать файлы
      </button>

      <button @click="submitFilesToServer()"
              class="cont-submit btn-contact btn-style" name="button" style="margin-left: 20px; border: 1px gainsboro solid"> Загрузить на сервер
      </button>
    </div>
    <br/>

    <div v-if="files.length" class="mb-10 about-wrap user-menu">
      <h5 class="sidebar-title">Предпросмотр</h5>
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
  props: ['type', 'uid'],
  data () {
    return {
      filesFolderName: '',
      files: []
    }
  },

  created () {
    this.getCurrentUserInfo()
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
      this.preloaderState = true
      this.preloaderMessage = 'Загружаем файлы на сервер'
      let formData = new FormData()
      formData.append('folder_name', this.filesFolderName)
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i]
        formData.append('files[' + i + ']', file)
      }
      const apiUrl = '/post/upload-files/' + this.type+ '/' + this.uid
      this.send(apiUrl, 'post', formData).then(response => {
         this.files = []
         this.preloaderState = false
         this.$emit('files_load', response)
      })
    },

  } // --- methods

}
</script>

<style>

input[type="file"] {
  position: absolute;
  top: -500px;
}

/*div.file-listing img1 {*/
/*   max-width: 90%;*/
/*}*/

.img-preview {
  width: 100%;
}
</style>


<!--Array-->
<!--(-->
<!--[folder_name] => rtyyyy-->
<!--[files] => Array-->
<!--(-->
<!--[0] => Illuminate\Http\UploadedFile Object-->
<!--(-->
<!--[test:Symfony\Component\HttpFoundation\File\UploadedFile:private] =>-->
<!--[originalName:Symfony\Component\HttpFoundation\File\UploadedFile:private] => Lighthouse.jpg-->
<!--[mimeType:Symfony\Component\HttpFoundation\File\UploadedFile:private] => image/jpeg-->
<!--[error:Symfony\Component\HttpFoundation\File\UploadedFile:private] => 0-->
<!--[hashName:protected] =>-->
<!--[pathName:SplFileInfo:private] => /tmp/php9FqbfZ-->
<!--[fileName:SplFileInfo:private] => php9FqbfZ-->
<!--)-->

<!--[1] => Illuminate\Http\UploadedFile Object-->
<!--(-->
<!--[test:Symfony\Component\HttpFoundation\File\UploadedFile:private] =>-->
<!--[originalName:Symfony\Component\HttpFoundation\File\UploadedFile:private] => Penguins.jpg-->
<!--[mimeType:Symfony\Component\HttpFoundation\File\UploadedFile:private] => image/jpeg-->
<!--[error:Symfony\Component\HttpFoundation\File\UploadedFile:private] => 0-->
<!--[hashName:protected] =>-->
<!--[pathName:SplFileInfo:private] => /tmp/phpxhp6MC-->
<!--[fileName:SplFileInfo:private] => phpxhp6MC-->
<!--)-->

<!--[2] => Illuminate\Http\UploadedFile Object-->
<!--(-->
<!--[test:Symfony\Component\HttpFoundation\File\UploadedFile:private] =>-->
<!--[originalName:Symfony\Component\HttpFoundation\File\UploadedFile:private] => Tulips.jpg-->
<!--[mimeType:Symfony\Component\HttpFoundation\File\UploadedFile:private] => image/jpeg-->
<!--[error:Symfony\Component\HttpFoundation\File\UploadedFile:private] => 0-->
<!--[hashName:protected] =>-->
<!--[pathName:SplFileInfo:private] => /tmp/phpDDQflg-->
<!--[fileName:SplFileInfo:private] => phpDDQflg-->
<!--)-->

<!--)-->

<!--)-->
