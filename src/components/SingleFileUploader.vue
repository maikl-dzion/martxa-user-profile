<template>
<div>

    <Preloading
      :preloader="preloaderState"
      :message="preloaderMessage"
    ></Preloading>

    <input type="file" id="file" ref="file" @change="handleFileUpload()" style="display: none" />

    <div style="text-align: center; border: 0px red solid; width: 100%" >
      <button @click="selectFile()" name="button"
              style="border:0px; height: 25px; width:120px; padding:0px; margin:0px; font-size: 10px"
              class="cont-submit btn-contact btn-style" > Выбрать файл
      </button>

<!--      <button @click="submitFilesToServer()"-->
<!--              class="cont-submit btn-contact btn-style" name="button" style="margin-left: 20px"> Загрузить на сервер-->
<!--      </button>-->

    </div>

<!--    <div style="text-align: center">{{file.name}}</div>-->
<!--    <div v-if="file.name" class="row"-->
<!--         style="border:1px red solid; margin:0px; padding:0px" >-->
<!--        <div class="col-md-12 col-sm-6 col-xs-12 col" style="margin:0px; padding:0px" >-->
<!--          <div class="footer-widget instagram-wrap" style="width: 100px; margin: 0px auto 0px auto">-->
<!--            <img ref="image-user" class="img-preview" style="width:100%">-->
<!--          </div>-->
<!--        </div>-->
<!--    </div>-->

</div>
</template>

<script>

export default {
  props: ['type', 'uid'],
  data () {
    return {
      file: {}
    }
  },

  created () {
    this.getCurrentUserInfo()
  },

  methods: {

    selectFile () {
      this.$refs.file.click()
    },

    handleFileUpload () {
      this.file = this.$refs.file.files[0]
      this.getImagePreview()
      this.submitFileToServer()
    },

    getImagePreview () {
        let reader = new FileReader()
        reader.addEventListener('load', function () {
            this.$refs['image-user'].src = reader.result
        }.bind(this), false)
        reader.readAsDataURL(this.file)
    },

    // Отправка файлов на сервер
    submitFileToServer () {
      this.preloaderState = true
      this.preloaderMessage = 'Загружаем файл на сервер'
      let formData = new FormData()
      formData.append('file', this.file)
      const apiUrl = '/post/upload-single-file/' + this.type + '/' + this.uid
      this.send(apiUrl, 'post', formData).then(response => {
         this.file = {}
         this.preloaderState = false
        this.$emit('file_load', response)
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
