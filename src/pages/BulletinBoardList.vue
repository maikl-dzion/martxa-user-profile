<template>
  <page-template>
    <section class="blog-details-area ptb-101" style="">

      <div class="container">
        <div class="row">

          <!--- ЛЕВАЯ ПАНЕЛЬ ---->
          <div class="col-md-3 col-sm-6 col-xs-12" style="">
            <aside class="left-sidebar">
              <div class="mb-20 about-wrap user-menu">
                <h3 class="sidebar-title" style="font-size: 18px; font-weight: bold">Категории объявлений</h3>
                <ul>

                  <li @click="getCategoryItems($event, {})" class="menu-category-item">
                    <a>Показать все объявление ({{ allItemsCount }})</a>
                  </li>
                  <li v-for="(item) in categories"
                      @click="getCategoryItems($event, item)"
                      class="menu-category-item">
                    <a v-if="!item.items_count">{{ item.name }} ({{ item.items_count }})</a>
                    <a v-else>{{ item.name }} <span style="color:green; font-weight: bold">
                                                       [ {{ item.items_count }} ]</span></a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>

          <!--- ПРАВАЯ ПАНЕЛЬ ---->
          <div class="col-md-9 col-sm-6 col-xs-12">
            <div class="blog-details-wrap">

              <p class="span-shadow" style="border: 0px red solid; width: 220px; padding:0px; margin-bottom:10px;">
                   <span @click="addFormState = !addFormState" class="btn-hover-effect square-list"
                         style="width: 100%; margin:0px; background:#337ab7; border: 0px red solid;">
                         Добавить объявление</span>
              </p>

              <BoardItemForm
                v-if="addFormState"
                @save_response="saveResponseHandle"/>

              <div style="box-shadow: 0 20px 0 #3C93D5; height: 5px; margin:20px 0px 20px 0px"></div>

              <div style="border: 0px red solid; margin-top:60px; ">
                <h3 class="sidebar-title"
                    style="font-size: 18px; font-weight: bold"> Объявления </h3>
                <h5 v-if="currentCategoryName" class="sidebar-title"
                    style="font-size: 15px;">Категория : {{ currentCategoryName }} ({{ boardItems.length }})</h5>

                <div v-for="(item) in boardItems">
                  <!--  <pre>{{item}}</pre>-->
                  <div class="blog-content" style="border:1px gainsboro solid; margin-bottom:10px;">
                    <div class="blog-meta">
                      <ul>
                        <li><a href="#"><i class="fa fa-user"></i> {{ item.username }}</a></li>
                      </ul>
                    </div>

                    <div>Категория : {{ item.cat_name }}</div>
                    <h3>
                      <router-link tag="a" :to="'/page/bulletin-board/item/' + item.board_id"  >
                        {{ item.title }}
                      </router-link>
                    </h3>

                    <div style="display: flex">
                      <div style="width:200px;">
                        <img v-if="item.files && item.files[0] && item.files[0].path"
                             :src="rootPath +'/'+ item.files[0].path"
                             style="width: 100%" alt="">
                        <p>Цена : {{ item.price }}</p>
                      </div>
                      <div style="width:100%; margin-left:10px">
                        <div v-if="item.short_desc">{{ item.short_desc }}</div>
                        <div v-else>{{ item.description }}</div>
                      </div>
                    </div>

                    <div style="display: flex">

                      <router-link
                        tag="a" :to="'/page/bulletin-board/item/' + item.board_id" class="btn-style"
                        style="border:1px #b0c5de solid; width:180px; height: 32px; padding:2px; display: block;
                                          margin:3px; text-align:center; font-style: italic; font-size: 11px; "
                      > Подробнее
                      </router-link>

                      <a v-if="userInfo.user_id == item.user_id"
                         @click="deleteItem(item.board_id)" class="btn-style"
                         style="border:1px #b0c5de solid; width:180px; height: 32px; padding:2px; display: block;
                                          margin:3px; text-align:center; font-style: italic; font-size: 11px; cursor:pointer;"
                         disabled="true"
                      >Удалить объявление</a>

                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div><!--- /col-md-9 col-xs-12 --->
          <!--- ./ ПРАВАЯ ПАНЕЛЬ ---->

        </div>
      </div>

    </section>
  </page-template>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

import FilesLoaderPreview from '@/components/FilesLoaderPreview'
import BoardItemForm from '@/components/bulletin/BoardItemForm'

export default {
  name: 'BulletinBoard',
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

    boardItems: [],
    categories: [],
    itemFiles: [],

  }),

  /////////////////
  components: {
    FilesLoaderPreview,
    BoardItemForm
  },

  /////////////////
  created () {
    this.getRootFilesPath()
    this.getMenuCategories()
    this.getCategoryItems()
  },

  ////////////////
  methods: {

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
      this.preloaderState = true
      const url = '/bulletin-board/' + itemId
      this.send(url).then(response => {
        this.saveType = 'edit'
        this.itemModel = response
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

  mounted () {
    this.getEventBus('dropdown-menu-close', status => {
    })
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


/*.my-shadow {*/
/*  box-shadow: inset 2px 2px 5px rgba(154, 147, 140, 0.5), 1px 1px 5px rgba(255, 255, 255, 1);*/
/*  box-shadow: 0 2px 0 #3C93D5;*/
/*  box-shadow: 2px 2px white, 4px 4px;*/
/*}*/


</style>
