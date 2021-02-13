<template>
  <page-template>

    <!-- blog-details-area start -->
    <section class="blog-details-area1 ptb-101" style="border:0px red solid; ">

      <Preloading
        :preloader="preloaderState"
        :message="preloaderMessage"
      ></Preloading>

      <InfoMessage
        :message="responseMessage"
        :color="responseColor"
      ></InfoMessage>

      <div class="container-fluid">
        <div class="row">

          <!--- ЛЕВАЯ ПАНЕЛЬ ---->
          <div class="col-md-3 col-sm-6 col-xs-12" style="border:0px red solid ">
            <aside class="left-sidebar">

              <!--- Avatar --->
              <UserAvatar
                :user="userInfo"
                :user_id="userId"
              ></UserAvatar>

              <div class="search-sidebar mb-20">
                <form action="#">
                  <input type="text" name="search" placeholder="Search Here">
                  <button type="button" name="button"><i class="fa fa-search"></i></button>
                </form>
              </div>

              <div class="mb-20 about-wrap user-menu">
                <h3 class="sidebar-title">Меню пользователя</h3>
                <ul>
                  <li><a @click="tab = 'user_info'">Основная информация</a></li>
                  <li><a @click="tab = 'change_password'">Изменить пароль</a></li>
                  <li><a @click="tab = 'photos'">Фотографии</a></li>
                  <li><a @click="tab = 'info_details'">Подробная информация</a></li>
                  <li><a @click="tab = 'articles'">Статьи</a></li>
                  <li><a @click="tab = 'messages'">Сообщения</a></li>
                  <li><a @click="tab = 'declaration'">Объявления</a></li>
                  <li><a @click="tab = 'orders'">Заказы</a></li>
                </ul>
              </div>

            </aside>
          </div>

          <!--- ПРАВАЯ ПАНЕЛЬ ---->
          <div class="col-md-9 col-xs-12">
            <div class="blog-details-wrap">

              <!--                <div class="blog-details-img">-->
              <!--                  <img src="/assets/images/blog/blog-details.jpg" alt="">-->
              <!--                </div>-->

              <template v-if="tab == 'info_details'">
                user_info_details
              </template>
              <template v-else-if="tab == 'photos'">

                 <MultiFilesUploader
                   type="user"
                   :uid="userId"
                   @files_load="filesLoaded"
                 ></MultiFilesUploader>

                 <div>
                   <div v-if="userFiles.length" class="mb-10 about-wrap user-menu">
                       <h5 class="sidebar-title">Фотографии пользователя</h5>
                   </div>

                   <div class="row">
                     <div class="col-md-12 col-sm-6 col-xs-12 col">
                       <div class="footer-widget instagram-wrap">
                         <ul><li v-for="(file) in userFiles" style="width:150px; border:1px gainsboro solid" >
                             <a href="#" :key="file.file_id">
                                 <img :src="rootPath + file.path" class="img-preview" style="width:100%;">
                             </a>
                             <div><button @click="deleteFile(file.file_id)" class="btn-style" style="width: 100%; border:0px;" >удалить</button></div>
                         </li></ul>
                       </div>
                     </div>
                   </div>

                   <div><hr></div>
                 </div>
              </template>
              <template v-else-if="tab == 'articles'">
                user_articles
              </template>
              <template v-else-if="tab == 'orders'">
                user_orders
              </template>
              <template v-else-if="tab == 'change_password'">
                <!---  Изменение пароля  --->
                <div class="blog-details-content">
                  <h3 class="sidebar-title" style="font-style: italic; font-size: 17px">Изменить пароль</h3>
                  <hr/>
                  <div class="col-md-12 col-xs-12">
                    <div class="faq-form form-style">
                      <form @submit.prevent="">
                        <div class="row">

                          <div class="col-xs-12">
                            <div class="row">
                              <div class="col-xs-3">
                                <div class="input-label">
                                  <div>Новый пароль</div>
                                </div>
                              </div>
                              <div class="col-xs-5">
                                <input v-model="newPassword.password"
                                       required="true" type="text" placeholder="Новый пароль">
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12">
                            <div class="row">
                              <div class="col-xs-3">
                                <div class="input-label">
                                  <div>Повторить пароль</div>
                                </div>
                              </div>
                              <div class="col-xs-5">
                                <input v-model="newPassword.repeat_pwd"
                                       required="true" type="text" placeholder="Новый пароль">
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12" style="color:red">
                            {{ newPwdCompareWarn }}
                          </div>

                          <div class="col-xs-12">
                            <hr/>
                            <button @click="changePassword()"
                                    class="cont-submit btn-contact btn-style" name="submit"> Изменить пароль
                            </button>
                          </div>

                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <!---  ./ Изменение пароля  --->
              </template>
              <template v-else-if="tab == 'user_info'">
                <!---  Основная информация о пользователе --->
                <UserGeneralInfo/>
                <!--- ./ Основная информация о пользователе --->
              </template>
              <template v-else>
                   в разработке
              </template>

            </div>
          </div>

        </div>
      </div>
    </section>
    <!-- blog-details-area end -->

  </page-template>
</template>

<script>

import UserGeneralInfo from '@/components/user/UserGeneralInfo'
import UserAvatar from '@/components/user/UserAvatar'
import MultiFilesUploader from '@/components/MultiFilesUploader'

export default {

  data: () => ({
    tab: 'user_info',
    emailVerifyCode: '',
    emailVerifyState: false,
    phoneVerifyState: false,

    newPassword: {
      password: '',
      repeat_pwd: ''
    },

    userFiles : [],

  }),

  components: {
    UserGeneralInfo,
    MultiFilesUploader,
    UserAvatar
  },

  created () {
    this.getCurrentUserInfo()
    this.getRootFilesPath()
  },

  mounted () {
    this.getUserInfo()
    this.getUsersList()
    this.getUserFiles()
  },

  computed: {
    newPwdCompareWarn () {
      return this.compareNewPassword()
    }
  },

  methods: {

    filesLoaded(response) {
       this.getUserFiles()
       this.responseStatusHandle(response,
                    'Файлы успешно загружены',
                      'Не удалось загрузить файлы')
    },

    deleteFile(fileId) {
      this.preloaderState = true
      const apiUrl = '/delete/file/' + fileId
      this.send(apiUrl, 'delete').then(response => {
         this.preloaderState = false
         this.getUserFiles()
         this.responseStatusHandle(response, 'Файл удален', 'Файл не получилось удалить')
      })
    },

    compareNewPassword () {
      if (this.newPassword.password != this.newPassword.repeat_pwd) {
        return 'Пароли не совпадают'
      }
      return ''
    },

    changePassword () {

      if (!this.changePasswordValidate()) {
        return false
      }

      this.preloaderState = true
      const data = this.newPassword

      const apiUrl = '/post/user/change-password/' + this.userId
      this.send(apiUrl, 'put', data).then(response => {
        this.responseStatusHandle(response, 'Пароль успешно изменен', 'Не удалось изменить пароль')
      })
    },

    changePasswordValidate () {

      if (!this.newPassword.password) {
        return false
      }

      let message = this.compareNewPassword()

      if (message) {
        this.responseMessage = message
        this.responseColor = 'red'
        return false
      }

      this.respInfoClear()

      return true
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

    getUserFiles() {
        const apiUrl = '/user/get-files/' + this.userId
        this.send(apiUrl).then(response => {
            this.userFiles = response
        })
    },

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

</style>
