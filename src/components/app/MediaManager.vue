<template><div>

<!--  <pre>{{getAlbums}}</pre>-->
  <template v-if="getAlbums">

        <div class="mb-10 about-wrap user-menu">
          <h5 class="sidebar-title" style="font-size:18px; font-weight: bold;">Фотоальбомы</h5>
        </div>

        <div><div class="post-wrap" style="justify-content: end;" >

            <div v-for="(name) in getAlbums" class="post-item">
                 <div @click="albumFilesShow(name)" class="post-item-wrap">
                    <img :src="assetsUrl + '/images/folder-img.jpg'">
                    <div class="line">
                        <a   class="post-link"><span>Посмотреть фото из альбома</span></a>
                    </div>
                     {{name}}
                  </div>
            </div>

        </div></div>

<!--        <div style="display: flex">-->
<!--            <div v-for="(name) in getAlbums"-->
<!--                  @click="albumFilesShow(name)"-->
<!--                  style="width:150px; height:50px; border:1px gainsboro solid; margin:3px; background: #b0c5de;-->
<!--                         text-align: center; border-radius: 5px; font-weight: bold; padding-top:10px; cursor:pointer;-->
<!--                         box-shadow: 6px 6px #989898, 12px 12px #6c6666;" >-->
<!--                  <div>{{name}}</div>-->
<!--            </div>-->
<!--        </div>-->


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

/** {*/
/*  margin: 0;*/
/*  box-sizing: border-box;*/
/*}*/

.post-wrap {
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.post-item {
  padding: 10px;
  cursor:pointer;
}
.post-link {
  text-decoration: none;
  display: block;
  color: blue;
  font-weight: 500;
  position: relative;
  z-index: 5;
}
.post-item-wrap {
  position: relative;
  background-color: #FDFDFD;
  background-image: radial-gradient(#CADAD9 2px, transparent 2px);
  background-size: 6px 6px;
}
.post-item-wrap img {
  display: block;
  width: 100%;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, .3);
  transition: .3s;
}
.post-item:hover .post-item-wrap img {
  transform: translate(12px, 12px);
}
.line {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  margin: 12px 0 0 12px;
  opacity: 0;
  transition: .3s;
}
.line:before {
  content: "";
  position: absolute;
  bottom: -15px;
  left: 50%;
  width: 5px;
  height: 5px;
  margin: 0 0 0 -2px;
  background: #FC473E;
  border-radius: 50%;
}
.line:after {
  content: "";
  position: absolute;
  width: 1px;
  left: 50%;
  height: 50px;
  top: 100%;
  bottom: 0;
  margin-top: 13px;
  transform: scaleY(-1);
  background: linear-gradient(to bottom, rgba(252, 71, 62, 0) 0%, rgba(252, 71, 62, 1) 100%);
}
.post-item:hover .line {
  opacity: 1;
}
.post-item-wrap:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background: white;
  transition: .3s;
}
.post-item:hover .post-item-wrap:after {
  opacity: .7;
  top: 12px;
  left: 12px;
  right: -12px;
  bottom: -12px;
}
@media (min-width: 768px) {
  .post-item {
    flex-basis: 50%;
    flex-shrink: 0;
  }
}
@media (min-width: 960px) {
  .post-item {
    flex-basis: 33.333333333%;
  }
}

</style>
