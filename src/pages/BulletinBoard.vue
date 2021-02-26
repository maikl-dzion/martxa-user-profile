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
                <h3 class="sidebar-title" style="font-size: 19px">Категории</h3>
                <ul>
                  <li v-for="(item) in categories" >
                     <a @click="getCategoryItems(item)">{{item.name}}</a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>

          <!--- ПРАВАЯ ПАНЕЛЬ ---->
          <div class="col-md-9 col-xs-12">
            <div class="blog-details-wrap">

                 <div class="faq-form form-style"
                      style="border:1px gainsboro solid; margin-bottom:20px; padding:5px">
                  <form id="user-general-info" @submit.prevent="" >
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
                          <input v-model="itemModel.category_id" type="text" placeholder="Категория" >
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-12">
                      <div class="row">
                        <div class="col-xs-4">
                          <div class="input-label">Цена</div>
                        </div>
                        <div class="col-xs-8">
                          <input v-model="itemModel.price" type="text" placeholder="Цена" >
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
                                           placeholder="Описание объявления"  ></textarea>
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-12" >
                      <button @click="save()"
                              class="cont-submit btn-contact btn-style">Сохранить
                      </button>
                    </div>
                    <div class="col-xs-12"><hr/></div>

                  </div>
                </form>
              </div>


             <div style="border: 0px red solid" >

                 <div v-for="(item) in boardItems" >
                     <div class="blog-content">
                         <div class="blog-meta">
                           <ul>
                             <li><a href="#"><i class="fa fa-user"></i> Admin</a></li>
                             <li><a href="#"><i class="fa fa-comment"></i> 5 Comment</a></li>
                             <li><a href="#"><i class="fa fa-heart"></i> 5 Love</a></li>
                           </ul>
                         </div>
<!--                         <p>{{item.category_id}}</p>-->
                         <h3><a href="#">{{item.title}}</a></h3>
                         <p>{{item.description}}</p>
                         <p>{{item.price}}</p>
                         <a href="#" class="btn-style" style="border:1px #b0c5de solid; width:110px; padding:2px; margin:3px;text-align:center">Подробнее</a>
                     </div>
                 </div>

             </div>

<!--             <PreViewJson :items="boardItems" />-->

            </div>
          </div>

        </div>
      </div>
    </section>
    <!-- blog-details-area end -->

  </page-template>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

// import UserGeneralInfo from '@/components/user/UserGeneralInfo'
// import UserAvatar from '@/components/user/UserAvatar'
// import MultiFilesUploader from '@/components/MultiFilesUploader'

export default {
  name : "BulletinBoard",
  data: () => ({
      saveType : 'add',
      itemModel: {
          title       : '',
          category_id : 0,
          description : '',
          price       : '',
          user_id     : '',
      },
      boardItems : [],
      categories : [],
  }),

  /////////////////
  computed: {
  },

  ///////////////////
  created () {
      // this.getCurrentUserInfo(); // получить информацию о текущем пользователе
      // this.getRootFilesPath();   // получить url для получения файлов
      // this.fetchUsers();
      // this.getBoardItems ();
      // this.getItem (2);
      // this.deleteItem(1)
      this.getBoardItems ();
      this.getMenuCategories();
  },

  ////////////////
  methods: {

    getCategoryItems(item){
        const categoryId = item.cat_id;
        this.getBoardItems (categoryId);
    },

    // Получить все объявления
    getMenuCategories() {
      this.setPreloader(true)
      const url = '/bulliten-board/menu-categories';
      this.send(url).then(response => {
         this.setPreloader(false)
         this.categories = response;
      })
    },

    // Получить все объявления
    getBoardItems (catId = 0) {
      this.setPreloader(true)
      const url = '/bulliten-board/list/' + catId;
      this.send(url).then(response => {
         this.setPreloader(false)
         this.boardItems = response;
      })
    },

    // Получить все объявления
    getItem (itemId) {
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
    createItem () {
      this.setPreloader(true)
      const data   = this.itemModel
      data.user_id = this.userId;
      const url = '/save/bulliten-board'
      this.send(url, 'post', data).then(response => {
        this.setPreloader(false)
        this.getBoardItems()
        this.responseStatusHandle(response, 'Обявление успешно создано', 'Не удалось создать')
      })
    },

    // Обновить объявление
    updateItem () {
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
         switch(this.saveType)  {
             case 'add' :
               this.createItem ();
               break;

             case 'edit' :
               this.updateItem ();
               break;
         }
    },

    responseStatusHandle (response, successMessage = null, errorMessage = null, fn = null) {
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

</style>
