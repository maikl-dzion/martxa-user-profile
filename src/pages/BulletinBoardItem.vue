<template>
  <page-template>
    <section class="blog-details-area" >

      <div class="container">

        <router-link
          tag="a" to="/bulletin-board" class="btn-style"
          style="border:1px #b0c5de solid; width:180px; height: 32px; padding:2px; display: block;
                 margin:0px 0px 0px 0px; text-align:center; font-style: italic; font-size: 11px; position: absolute"
        > Вернуться в каталог
        </router-link>

        <div class="row">
          <div class="col-md-9 col-sm-6 col-xs-12">
              <div class="blog-details-wrap">

                  <!--- БЛОК РЕДАКТИРОВАНИЯ --->
                  <p class="span-shadow"
                     style="border: 0px red solid; width: 250px; padding:0px; margin-bottom:10px; float: right">
                       <span @click="addFormState = !addFormState" class="btn-hover-effect square-list"
                             style="width: 100%; margin:0px; background:#337ab7; border: 0px red solid;">
                             Редактировать объявление</span>
                  </p>
                  <div style="clear:both"></div>

                  <BoardItemForm
                    v-if="addFormState"
                    :board_id="boardItem.board_id"
                    @save_response="saveResponseHandle"/>
                  <!--- ./ БЛОК РЕДАКТИРОВАНИЯ --->

                  <div style="box-shadow: 0 20px 0 #3C93D5; height: 5px; margin:10px 0px 10px 0px"></div>

                  <!--- БЛОК ОБЪЯВЛЕНИЯ --->
                  <div style="border: 0px red solid; margin-top:30px; ">
<!--                    <h6 v-if="currentCategoryName" style="font-size: 15px;"-->
<!--                        class="sidebar-title" >Категория : {{ currentCategoryName }} </h6>-->

                    <div class="card-item">
                      <div class="blog-content" style="border:1px gainsboro solid; margin-bottom:10px;">

                        <div class="blog-meta" style="margin-left: 7px">
                           <h2 class="sidebar-title" style="font-size: 22px; font-weight: bold"> {{ boardItem.title }} </h2>
<!--                           <a><i class="fa fa-user"></i> {{ boardItem.username }}</a>-->
                        </div><hr/>

                        <div class="item-photo-list" style="display: flex" >
                            <div style="width:50%; border:0px red solid" >

                              <PhotoHoverEffect
                                  v-if="itemFiles[0] && itemFiles[1]"
                                  :image1="rootPath +'/'+ itemFiles[0].path"
                                  :image2="rootPath +'/'+ itemFiles[1].path"
                                  :title="boardItem.title"/>
                              <PhotoHoverEffect
                                  v-else-if="itemFiles[0]"
                                  :image1="rootPath +'/'+ itemFiles[0].path"
                                  :title="boardItem.title"/>

                            </div>
                            <div style="width:50%; border:0px red solid; padding:0px 10px" >

                              <div style="width:200px; ">
                                <p style="font-size: 16px; background: #2ecc71; padding: 4px; text-align: center; font-weight: bold; color: white"
                                >Цена : {{ boardItem.price }}</p>
                              </div>

                              <div v-if="boardItem.short_desc"
                                    style="justify: center">{{ boardItem.short_desc }}</div>
                            </div>
                        </div><hr/>

                        <div style="display: flex">
                           <img v-for="(photo) in itemFiles"
                                :src="rootPath +'/'+ photo.path"
                                style="width: 20%; margin:2px 2px 2px 0px" >
                        </div><hr/>

                        <div style="display: flex; margin:10px 0px 10px 0px;">
                            <div style="width:100%; margin-left:10px">
                              <div >{{ boardItem.description }}</div>
                            </div>
                        </div><hr/>

                        <div style="display: flex">

                          <a v-if="userInfo.user_id == boardItem.user_id"
                             @click="deleteItem(boardItem.board_id)" class="btn-style"
                             style="border:1px #b0c5de solid; width:180px; height: 32px; padding:2px; display: block;
                                    margin:0px; text-align:center; font-style: italic; font-size: 11px; cursor:pointer;"
                             disabled="true" >Удалить объявление</a>
                        </div>

                      </div>
                    </div>
                  </div>
                  <!--- ./ БЛОК ОБЪЯВЛЕНИЯ --->

            </div>
          </div><!--- /col-md-9 col-xs-12 --->
        </div>

      </div>



    </section>

  </page-template>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

import FilesLoaderPreview from '@/components/FilesLoaderPreview'
import BoardItemForm from '@/components/bulletin/BoardItemForm'
import PhotoHoverEffect from '@/components/app/PhotoHoverEffect'

export default {
  name: 'BulletinBoardItem',
  data: () => ({

    saveType: 'add',
    currentCategoryName: '',
    addFormState: false,
    allItemsCount: 0,

    itemModel: {
      title: '',
      category_id: 0,
      short_desc: '',
      description: '',
      price: '',
      user_id: '',
    },

    boardItem: {},
    categories: [],
    itemFiles: [],

  }),

  /////////////////
  components: {
    FilesLoaderPreview,
    BoardItemForm,
    PhotoHoverEffect
  },

  /////////////////
  created () {

    this.getRootFilesPath()
    this.getMenuCategories()
    this.getCategoryItems()

    // const itemId = this.$route.params.item_id
    // this.getItem(itemId);

    this.getItemInfo()

  },

  ////////////////
  methods: {

    async getItemInfo () {

      const itemId = this.$route.params.item_id
      await this.getItem(itemId)
      await this.getItemFiles(itemId)

    },

    getCategoryItems (event = null, item = null) {

      let categoryId = 0
      this.currentCategoryName = 'Все Категории'
      if (item && item.cat_id) {
        categoryId = item.cat_id
        this.currentCategoryName = item.name
      }

      this.getBoardItems(categoryId)

      if (event) {
        const elem = event.target.parentElement
        const className = '.menu-category-item'
        const activeClass = 'menu-active'
        this.updateItemClassActive(elem, className, activeClass)
      }
    },

    // Получить все категории
    getMenuCategories () {
      // this.setPreloader(true)
      const url = '/bulletin-board/menu-categories'
      this.send(url).then(response => {
        this.setPreloader(false)
        this.categories = response
      })
    },

    // Получить все файлы
    getItemFiles (itemId) {
      const url = '/store/get-files/bulletin-board/' + itemId + '/resource_id'
      this.send(url).then(response => {
        this.itemFiles = response
      })
    },

    // Получить все объявления
    getBoardItems (catId = 0) {
      this.setPreloader(true)
      catId = (catId) ? '/' + catId : ''
      const url = '/bulletin-board/list' + catId
      this.send(url).then(response => {
        this.setPreloader(false)
        this.boardItems = response
        if (!catId) {
          this.allItemsCount = this.boardItems.length
        }
      })
    },

    // Получить 1 объявление
    getItem (itemId) {
      const url = '/bulletin-board/item/' + itemId
      this.send(url).then(response => {
        this.saveType = 'edit'
        this.boardItem = response
      })
    },

    // Удалить объявление
    deleteItem (itemId) {
      const url = '/save/bulletin-board/' + itemId
      this.send(url, 'delete').then(response => {
        this.getBoardItems()
        this.getMenuCategories()
        if (response) {
          alert('Обявление удалено')
        } else {
          alert('Не получилось удалить, попробуйте еще раз')
        }
      })
    },

    saveResponseHandle (response) {
      this.getBoardItems()
      this.getMenuCategories()
      const res = this.saveResponse(response, 'Успешное сохранение', 'Не удалось сохранить')
    },

  },  // --- Methods

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


.span-shadow {
  text-align: center
}

.span-shadow .btn-hover-effect {
  display: inline-block;
  margin: 5px;
  padding: 7px 15px;
  cursor: pointer;
  border-radius: 0px;
  transition: .2s linear;
  color: white;
  background: #337ab7;
}

.product-inner {
  width: 300px;
  margin: 0 auto;
  background: white;
  text-align: center;
  border-bottom: 2px solid #ebebec;
  transition: .2s linear;
}

.product-inner:hover {
  border-color: #bca480;
}

.product-wrap {
  position: relative;
  overflow: hidden;
  margin-bottom: 15px;
}

.product-wrap img {
  display: block;
  width: 100%;
}

.actions {
  position: absolute;
  left: 0;
  bottom: -20%;
  width: 100%;
  background: rgba(59, 62, 67, 0.75);
  transition: .3s linear;
}

.product-inner:hover .actions {
  bottom: 0;
}

.actions a {
  text-decoration: none;
  float: left;
  width: 33.33333333333333%;
  color: white;
  padding: 15px 0;
  transition: .2s linear;
}

.actions a:hover {
  background: rgba(59, 62, 67, 0.85);
}

.actions a:before {
  font-family: "FontAwesome";
}

.add-to-cart:before {
  content: "\f07a";
}

.quickview:before {
  content: "\f002";
}

.wishlist:before {
  content: "\f08a";
}

.product-info {
  padding-bottom: 10px;
  font-family: 'Noto Sans', sans-serif;
}

.product-title {
  margin: 0 0 10px 0;
  font-family: 'Noto Sans', sans-serif;
}

.product-title a {
  text-decoration: none;
  color: #1e1e1e;
  font-weight: 400;
  font-size: 16px;
}

.price {
  font-weight: bold;
  color: #bca480;
}


</style>
