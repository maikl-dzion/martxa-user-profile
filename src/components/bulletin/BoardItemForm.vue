<template>
<div class="faq-form form-style"
     style="border:1px gainsboro solid; margin-bottom:20px; padding:15px; box-shadow: 6px 6px #989898, 12px 12px #6c6666;">
     <form id="user-general-info" @submit.prevent="" ><div class="row">

          <div class="col-xs-12">
            <div class="row">
              <div class="col-xs-4">
                <div class="input-label">
                  <div>Наименование</div>
                  <div style="color:red; font-weight: bold; margin-left:10px;">*</div>
                </div>
              </div>
              <div class="col-xs-8">
                <input v-model="itemModel.title" required="true" type="text" placeholder="Наименование">
              </div>
            </div>
          </div>

          <div class="col-xs-12">
            <div class="row">

              <div class="col-xs-4">
                <div class="input-label">Категория</div>
              </div>

              <div class="col-xs-8">
                <div class="mainmenu" style="width:100%;"><ul>
                    <li style="border:1px grey solid; width: 100%; margin-bottom: 20px">

                      <div class="mainmenu-panel" style="display: flex; width: 100%;">
                        <div style="width: 50%; padding:4px 4px 4px 7px;">{{ selectCatName }}</div>
                        <a @click="catMenuToggle = !catMenuToggle"
                           style="width: 50%; text-align:right; padding:4px; display: block; cursor:pointer;">
                           Выбрать категорию <i class="fa fa-angle-down"></i></a>
                      </div>

                      <ul v-if="catMenuToggle" class="megamenu-dropdown" style="">
                        <li v-for="(item, i) in categories"
                            class="megamenu__li-item">
                          <a @click="selectCategories(item)"
                             class="megamenu__li__a"
                             href="#">{{ item.name }}</a>
                        </li>
                      </ul>

                    </li>
                </ul></div>
              </div>

            </div>
          </div>

          <div class="col-xs-12">
            <div class="row">
              <div class="col-xs-4"><div class="input-label">Цена</div></div>
              <div class="col-xs-8">
                  <input v-model="itemModel.price" type="text" placeholder="Цена">
              </div>
            </div>
          </div>

          <div class="col-xs-12">
            <div class="row">
              <div class="col-xs-4">
                <div class="input-label">Короткое описание</div>
              </div>
              <div class="col-xs-8">
                   <textarea v-model="itemModel.short_desc" class="contact-textarea"
                             placeholder="Короткое описание" style="height: 50px"></textarea>
              </div>
            </div>
          </div>

          <div class="col-xs-12">
            <div class="row">
              <div class="col-xs-4">
                <div class="input-label">Полное описание</div>
              </div>
              <div class="col-xs-8">
                       <textarea v-model="itemModel.description"
                                 class="contact-textarea" placeholder="Описание объявления"></textarea>
              </div>
            </div>
          </div>

          <div class="col-xs-12">
            <FilesLoaderPreview
              @get_files_load="filesLoader"
            ></FilesLoaderPreview>
          </div>

          <div class="col-xs-12">
              <button @click="save()" class="cont-submit btn-contact btn-style">Сохранить</button>
          </div>

     </div></form>
</div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import FilesLoaderPreview from '@/components/FilesLoaderPreview'

export default {
  name: "BulletinBoardForm",
  props : ['board_id'],

  data: () => ({

    saveType     : 'add',
    selectCatName: '',
    catMenuToggle: false,
    currentCategoryName: '',

    itemModel: {
        title: '',
        category_id: 0,
        short_desc: '',
        description: '',
        price: '',
        user_id: '',
    },

    categories: [],
    itemFiles : [],
  }),

  /////////////////
  components : {
    FilesLoaderPreview
  },

  /////////////////
  created() {
    this.getMenuCategories();
  },

  ////////////////
  methods: {

    filesLoader(files) {
      this.itemFiles = files;
    },

    selectCategories(item) {
      this.itemModel.category_id = item.cat_id;
      this.selectCatName = item.name;
      this.catMenuToggle = false;
    },

    // Получить все категории
    getMenuCategories() {
        // this.setPreloader(true)
        const url = '/bulletin-board/menu-categories';
        this.send(url).then(response => {
          this.setPreloader(false)
          this.categories = response;
        })
    },

    // Получить 1 объявление
    getItem(itemId) {
        this.preloaderState = true
        const url = '/bulletin-board/' + itemId;
        this.send(url).then(response => {
          this.saveType = 'edit';
          this.itemModel = response;
        })
    },

    // Удалить объявление
    deleteItem(itemId) {
        this.preloaderState = true
        const url = '/save/bulletin-board/' + itemId
        this.send(url, 'delete').then(response => {
          this.preloaderState = false
          this.getBoardItems()
          this.responseStatusHandle(response, 'Обявление удалено', 'Не получилось удалить, попробуйте еще раз')
        })
    },

    // Создать объявление
    createItem() {
        if(!this.userInfo) {
          alert('Для добавления объявлений нужна авторизация');
          return false;
        }
        this.setPreloader(true)
        const data   = this.itemModel
        data.user_id = this.userInfo.user_id;
        const url = '/save/bulletin-board'
        this.send(url, 'post', data).then(response => {
            this.setPreloader(false)
            if(response.result) {
                const insertId = response.result;
                this.submitFilesToServer (this.itemFiles, insertId)
            }
            this.$emit('save_response', response);
        })
    },

    // Обновить объявление
    updateItem() {
        const data = this.itemModel
        const itemId = data.board_id
        this.preloaderState = true;
        const url = '/save/bulletin-board/' + itemId
        this.send(url, 'put', data).then(response => {
          this.preloaderState = false
          this.getBoardItems()
          this.responseStatusHandle(response, 'Обявление успешно обновлено', 'Не удалось обновить')
        })
    },

    save() {
        switch (this.saveType) {
          case 'add' : this.createItem(); break;
          case 'edit' : this.updateItem(); break;
        }
    },

    // Отправка файлов на сервер
    submitFilesToServer (formDataFiles, itemId) {
        let userId = (this.userInfo.user_id) ? this.userInfo.user_id : 1;
        const resource = 'bulletin-board';
        const apiUrl = '/save/multiple-upload-files/' + resource + '/' + itemId + '/' + userId;
        this.send(apiUrl, 'post', formDataFiles).then(response => {

        })
    },

    saveResponseHandle(response, successMessage = null, errorMessage = null, fn = null) {
      const res = this.saveResponse(response, 'Успешное сохранение', 'Не удалось сохранить')
    },

  },  // --- Methods

  mounted() {
    this.getEventBus('dropdown-menu-close', status => {});
  }

}
</script>

<style scoped>

.user-menu ul li {
  cursor: pointer;
  line-height: 30px;
  border-bottom: 1px solid #f1f1f1;
}

.input-label {
  color: #296dc1;
  font-style: italic;
  border-bottom: 1px #296dc1 solid;
  display: flex;
}

.megamenu-dropdown {
  position: absolute;
  right: 0;
  z-index: 9999;
  transition: all .3s;
  -webkit-transition: all .3s;
  -moz-transition: all .3s;
  width: 590px;
  box-shadow: 0px 2px 3px rgb(0 0 0 15%);
  padding: 10px;
  background: #fff;
  border-top: 2px solid #296dc1;
  text-align: left;
  padding: 0px;
}

.megamenu__li-item {
  width: 192px;
  border: 1px gainsboro solid;
  margin: 2px;
  padding: 0px;
  height: 28px;
  float: left;
}

.megamenu__li__a {
  font-size: 10px;
  height: 100%;
  padding: 0px !important;
  text-align: center;
  text-transform: none;
  font-weight: 0;
}

.menu-category-item {
  border-bottom: 1px gainsboro solid;
}

.menu-active a {
  border-bottom: 1px #296dc1 solid !important;
  color: #296dc1 !important;
}

.span-shadow {text-align:center}
.span-shadow .btn-hover-effect {
  display: inline-block;
  margin: 5px;
  padding: 7px 15px;
  cursor: pointer;
  border-radius: 0px;
  transition: .2s linear;
  color: white;
  background:#337ab7;
}

.span-shadow .square-out {background:#3A2F28}
.span-shadow .square-out:hover {
  box-shadow: 0 0 0 2px white, 0 0 0 4px #3A2F28;
}

.span-shadow .shadow-live {background:#C1F1E4}
.span-shadow .shadow-live:hover {
  box-shadow: 200px 0 0 0 rgba(0,0,0,.3) inset;
}

.span-shadow .square-in {background:#D2973D}
.span-shadow .square-in:hover {
  box-shadow: 0 0 0 2px #D2973D inset, 0 0 0 4px white inset;
}

.span-shadow .square-list {
  background: #C76637;
  position: relative;
  top: 0;
  left: 0;
}
.span-shadow .square-list:hover {
  box-shadow: 2px 2px white, 4px 4px #C76637;
  top: -4px;
  left: -4px;
}


/*.my-shadow {*/
/*  box-shadow: inset 2px 2px 5px rgba(154, 147, 140, 0.5), 1px 1px 5px rgba(255, 255, 255, 1);*/
/*  box-shadow: 0 2px 0 #3C93D5;*/
/*  box-shadow: 2px 2px white, 4px 4px;*/
/*}*/

</style>
