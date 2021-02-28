<template><div>

<!--  <pre>{{getAlbums}}</pre>-->
  <template v-if="getAlbums">

        <div class="mb-10 about-wrap user-menu">
          <h5 class="sidebar-title" style="font-size:18px; font-weight: bold;">Фотоальбомы</h5>
        </div>

        <div style="display: flex">
            <div v-for="(name) in getAlbums"
                  @click="albumFilesShow(name)"
                  style="width:150px; height:50px; border:1px gainsboro solid; margin:3px; background: #b0c5de;
                         text-align: center; border-radius: 5px; font-weight: bold; padding-top:10px; cursor:pointer;
                         box-shadow: 6px 6px #989898, 12px 12px #6c6666;" >
                  <div>{{name}}</div>
            </div>
        </div>


        <div v-if="albumFiles.length" >
            <div style="padding:9px; font-style: italic">Название альбома : {{albumName}}</div>
            <ul>
              <template v-for="(file) in albumFiles"  style="width:150px; border:1px gainsboro solid" >
                <li  :key="file.file_id" style="width:150px; border:1px gainsboro solid">
                  <a href="#" >
                    <img :src="rootPath + file.path" class="img-preview" style="width:100%;">
                  </a>
                  <div><button @click="deleteFile(file.file_id)" class="btn-style" style="width: 100%; border:0px;" >удалить</button></div>
                </li>
              </template>
            </ul>
        </div>

        <hr/>

        <ul>
          <div  class="mb-10 about-wrap user-menu">
            <h5 class="sidebar-title" style="font-size:15px; font-weight: bold;" >Фотографии пользователя</h5>
          </div>
          <template v-for="(file) in getFiles"  style="width:150px; border:1px gainsboro solid" >
              <li v-if="!getAlbums[file.folder_name]" :key="file.file_id"
                  style="width:150px; border:1px gainsboro solid">
                  <a href="#" >
                    <img :src="rootPath + file.path" class="img-preview" style="width:100%;">
                  </a>
                  <div><button @click="deleteFile(file.file_id)" class="btn-style" style="width: 100%; border:0px;" >удалить</button></div>
              </li>
          </template>
        </ul>

  </template>
  <template v-else >

        <div  class="mb-10 about-wrap user-menu">
          <h5 class="sidebar-title" style="font-size:15px; font-weight: bold;" >Фотографии пользователя</h5>
        </div>

        <ul><li v-for="(file) in getFiles" :key="file.file_id" style="width:150px; border:1px gainsboro solid" >
          <a href="#" :key="file.file_id">
            <img :src="rootPath + file.path" class="img-preview" style="width:100%;">
          </a>
          <div><button @click="deleteFile(file.file_id)" class="btn-style" style="width: 100%; border:0px;" >удалить</button></div>
        </li></ul>

  </template>

</div></template>

<script>
export default {
  name: 'MediaManager',
  props : ['files', 'albums'],
  data() {
    return {
      albumName : '',
      albumFiles : [],
    }
  },
  computed : {

     getFiles() {
        return this.files;
     },

     getAlbums() {
        if(Object.keys(this.albums).length != 0)
           return this.albums;
        return false
     }
  },

  created() {
     this.getRootFilesPath ()
  },

  methods : {

      deleteFile(fileId) {
          this.setPreloader(true)
          const apiUrl = '/delete/file/' + fileId
          this.send(apiUrl, 'delete').then(response => {
            this.getUserFiles()
            this.saveResponse(response, 'Файл удален', 'Файл не получилось удалить')
          })
      },

      albumFilesShow(name) {
          this.albumFiles = [];
          this.albumName = name;
          for(let i in this.getFiles) {
             const file = this.getFiles[i]
             if(file.folder_name == name)
               this.albumFiles.push(file);
          }
      },
  }

}
</script>

<style scoped>

</style>
