<template>
  <page-template>

    <!-- blog-details-area start -->
    <section class="blog-details-area1 ptb-101" style="border:0px red solid; ">

      <div class="container-fluid">
        <div class="row">

          <!--- ЛЕВАЯ ПАНЕЛЬ ---->
          <div class="col-md-3 col-sm-6 col-xs-12" style="border:0px red solid ">
            <aside class="left-sidebar">
              <div class="mb-20 about-wrap user-menu">
                <h3 class="sidebar-title" style="font-size: 18px; font-weight: bold">Категории</h3>
                <ul>
                  <li @click="getCategoryItems($event, {})" class="menu-category-item">
                     <a>Показать все объявление</a>
                  </li>
                  <li v-for="(item) in categories"
                      @click="getCategoryItems($event, item)"
                      class="menu-category-item">
                      <a>{{ item.name }} ({{item.items_count}})</a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>


          <!--- ПРАВАЯ ПАНЕЛЬ ---->
          <div class="col-md-9 col-xs-12">
            <div class="blog-details-wrap">

<!--              <p class="span-shadow">-->
<!--                <span class="btn-hover-effect square-out"  >ЭФФЕКТ 1</span>-->
<!--                <span class="btn-hover-effect shadow-live" >ЭФФЕКТ 2</span>-->
<!--                <span class="btn-hover-effect square-in"   >ЭФФЕКТ 3</span>-->
<!--                <span class="btn-hover-effect square-list" >ЭФФЕКТ 4</span>-->
<!--              </p>-->

              <p class="span-shadow" style="border: 0px red solid; width: 220px; padding:0px; margin-bottom:10px;" >
                 <span @click="addFormState = !addFormState" class="btn-hover-effect square-list"
                       style="width: 100%; margin:0px; background:#337ab7; border: 0px red solid;">
                       Добавить объявление</span>
              </p>

<!--              <h3 class="sidebar-title" style="font-size: 16px">Добавить объявление</h3>-->
              <div v-if="addFormState" class="faq-form form-style"
                   style="border:1px gainsboro solid; margin-bottom:20px; padding:15px;
                          box-shadow: 6px 6px #989898, 12px 12px #6c6666;">
                <form id="user-general-info" @submit.prevent="">
                  <div class="row">

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

                          <div class="mainmenu" style="width:100%;">
                            <ul>
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
                            </ul>
                          </div>

                          <!--                          <div>{{selectCatName}}</div>-->
                          <!--                          <div class="mainmenu" style="border: red 0px solid" ><ul ><li>-->
                          <!--                            <a href="#">Выбрать категорию <i class="fa fa-angle-down"></i></a>-->
                          <!--                            <ul class="megamenu"  >-->
                          <!--                              <li v-for="(item, i) in categories"  >-->
                          <!--                                <a @click="selectCategories(item)"-->
                          <!--                                   class="mega-title1" href="#">{{item.name}}</a>-->
                          <!--                                  <ul>-->
                          <!--                                    <li><a href="about.html">About One</a></li>-->
                          <!--                                    <li><a href="about2.html">About Two</a></li>-->
                          <!--                                  </ul>-->
                          <!--                              </li>-->
                          <!--                            </ul>-->
                          <!--                          </li></ul></div>-->

                        </div>
                      </div>
                    </div>

                    <div class="col-xs-12">
                      <div class="row">
                        <div class="col-xs-4">
                          <div class="input-label">Цена</div>
                        </div>
                        <div class="col-xs-8">
                          <input v-model="itemModel.price" type="text" placeholder="Цена">
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-12">
                      <div class="row">
                        <div class="col-xs-4">
                          <div class="input-label">Описание</div>
                        </div>
                        <div class="col-xs-8">
                                 <textarea v-model="itemModel.description" class="contact-textarea"
                                           placeholder="Описание объявления"></textarea>
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-12">

                      <FilesLoaderPreview
                        @get_files_load="filesLoader"
                      ></FilesLoaderPreview>

                    </div>

                    <div class="col-xs-12">
                      <button @click="save()"
                              class="cont-submit btn-contact btn-style">Сохранить
                      </button>
                    </div>
                    <!--                    <div class="col-xs-12"><hr/></div>-->

                  </div>
                </form>
              </div>

              <div style="box-shadow: 0 20px 0 #3C93D5; height: 5px; margin:20px 0px 20px 0px"></div>

              <div style="border: 0px red solid; margin-top:60px; ">
                <h3 class="sidebar-title"
                    style="font-size: 18px; font-weight: bold"> Объявления </h3>
                <h5 v-if="currentCategoryName" class="sidebar-title"
                    style="font-size: 15px;">Категория : {{ currentCategoryName }}</h5>

                <div v-for="(item) in boardItems">

                      <div class="blog-content" style="border:1px gainsboro solid; margin-bottom:10px;" >

                          <div class="blog-meta">
                            <ul>
                                <li><a href="#"><i class="fa fa-user"   ></i> Admin</a></li>
                                <li><a href="#"><i class="fa fa-comment"></i> 5 Comment</a></li>
                                <li><a href="#"><i class="fa fa-heart"  ></i> 5 Love</a></li>
                            </ul>
                          </div>

                          <!--  <p>{{item.category_id}}</p>-->
                          <h3><a href="#">{{ item.title }}</a></h3>
                          <p>{{ item.description }}</p>
                          <p>Цена : {{ item.price }}</p>

                          <a href="#" class="btn-style"
                             style="border:1px #b0c5de solid; width:100px; height: 32px; padding:2px;
                                    margin:3px; text-align:center; font-style: italic; font-size: 11px; "
                             >Подробнее</a>

                      </div>

                </div>

              </div>
              <!--  <PreViewJson :items="boardItems" />-->
            </div>
          </div>

        </div>
      </div>
    </section>
    <!-- blog-details-area end -->

  </page-template>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

// import UserGeneralInfo from '@/components/user/UserGeneralInfo'
// import UserAvatar from '@/components/user/UserAvatar'

import FilesLoaderPreview from '@/components/FilesLoaderPreview'

export default {
  name: "BulletinBoard",
  data: () => ({
      saveType: 'add',
      selectCatName: '',
      catMenuToggle: false,
      currentCategoryName: '',
      addFormState : false,

      itemModel: {
        title: '',
        category_id: 0,
        description: '',
        price: '',
        user_id: '',
      },

      boardItems: [],
      categories: [],
      itemFiles : [],
  }),

  /////////////////
  computed: {},

  /////////////////
  components : {
    FilesLoaderPreview
  },

  /////////////////
  created() {
    // this.getCurrentUserInfo(); // получить информацию о текущем пользователе
    // this.getRootFilesPath();   // получить url для получения файлов
    // this.fetchUsers();
    // this.getBoardItems ();
    // this.getItem (2);
    // this.deleteItem(1)
    this.getBoardItems();
    this.getMenuCategories();
  },

  ////////////////
  methods: {

    filesLoader(files) {
       this.itemFiles = files;
       // this.saveResponse(response, 'Файлы успешно загружены', 'Не удалось загрузить файлы')
    },

    selectCategories(item) {
        this.itemModel.category_id = item.cat_id;
        this.selectCatName = item.name;
        this.catMenuToggle = false;
    },

    getCategoryItems(event, item) {

        let categoryId = 0;
        this.currentCategoryName = 'Все Категории';
        if(item.cat_id) {
          categoryId = item.cat_id;
          this.currentCategoryName = item.name;
        }
        this.getBoardItems(categoryId);

        const elem = event.target.parentElement;
        const className = '.menu-category-item';
        const activeClass = 'menu-active';
        this.updateItemClassActive(elem, className, activeClass);
    },

    // Получить все объявления
    getMenuCategories() {
        // this.setPreloader(true)
        const url = '/bulliten-board/menu-categories';
        this.send(url).then(response => {
          this.setPreloader(false)
          this.categories = response;
        })
    },

    // Получить все объявления
    getBoardItems(catId = 0) {
        this.setPreloader(true)
        catId = (catId) ? '/' + catId : '';
        const url = '/bulliten-board/list' + catId;
        this.send(url).then(response => {
            this.setPreloader(false)
            this.boardItems = response;
        })
    },

    // Получить все объявления
    getItem(itemId) {
        this.preloaderState = true
        const url = '/bulliten-board/' + itemId;
        this.send(url).then(response => {
          this.saveType = 'edit';
          this.itemModel = response;
        })
    },

    // Удалить объявление
    deleteItem(itemId) {
        this.preloaderState = true
        const url = '/save/bulliten-board/' + itemId
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
        const url = '/save/bulliten-board'
        this.send(url, 'post', data).then(response => {
          this.setPreloader(false)
          this.getBoardItems();
          if(response.result) {
              const insertId = response.result;
              this.submitFilesToServer (this.itemFiles, insertId)
              this.responseStatusHandle(response, 'Обявление успешно создано', 'Не удалось создать');
          }
        })
    },

    // Обновить объявление
    updateItem() {
        const data = this.itemModel
        const itemId = data.board_id
        this.preloaderState = true;
        const url = '/save/bulliten-board/' + itemId
        this.send(url, 'put', data).then(response => {
          this.preloaderState = false
          this.getBoardItems()
          this.responseStatusHandle(response, 'Обявление успешно обновлено', 'Не удалось обновить')
        })
    },

    save() {
        switch (this.saveType) {
          case 'add' :
            this.createItem();
            break;

          case 'edit' :
            this.updateItem();
            break;
        }
    },

    // Отправка файлов на сервер
    submitFilesToServer (formDataFiles, itemId) {
        let userId = (this.userInfo.user_id) ? this.userInfo.user_id : 1;
        const resource = 'bulliten-board';
        const apiUrl = '/save/multiple-upload-files/' + resource + '/' + itemId + '/' + userId;
        this.send(apiUrl, 'post', formDataFiles).then(response => {})
    },

    responseStatusHandle(response, successMessage = null, errorMessage = null, fn = null) {
      this.preloaderState = false
      const r = this.saveResponse(response)
      if (r.status) {
        this.responseMessage = successMessage
        if (fn) {
          fn(response)
        }
      } else {
        this.responseMessage = errorMessage
        this.responseColor = 'red'
        console.log(r.error)
        return false
      }
      return true
    },

  },  // --- Methods

  mounted() {
    this.getEventBus('dropdown-menu-close', status => {});
  }

}
</script>

<style>

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
