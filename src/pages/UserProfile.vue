<template>
  <page-template>

    <!-- blog-details-area start -->
    <section class="blog-details-area1 ptb-101" style="border:0px red solid; ">

      <div style="border:0px red solid;">

        <h3 class="sidebar-title" style="background: #296dc1; padding: 15px; color:white;">Личный кабинет</h3>

        <div class="row" style="background: #296dc1; padding: 0px; margin: 0px;">

          <!--- ЛЕВАЯ ПАНЕЛЬ ---->
          <div class="col-md-3 col-sm-6 col-xs-12" style="border:0px orange solid; padding:4px 10px 10px 10px" >
            <aside class="left-sidebar" style="padding: 0px" >

                <UserAvatar
                  :user="userInfo"
                  :user_id="userId"
                ></UserAvatar>

<!--                <div class="search-sidebar mb-20">-->
<!--                    <form action="#">-->
<!--                      <input type="text" name="search" placeholder="Search Here">-->
<!--                      <button @click="getUsers" type="button" name="button"><i class="fa fa-search"></i></button>-->
<!--                    </form>-->
<!--                </div>-->

                <div class="mb-20 about-wrap user-menu user-profile-menu">
<!--                    <h3 class="sidebar-title">Меню пользователя</h3>-->
                    <ul>
                      <li><a class="user-menu-active"
                             @click="selectUserMenu($event, 'user_info')" >Личная информация</a></li>
                      <li><a @click="selectUserMenu($event, 'change_password')">Изменить пароль</a></li>
                      <li><a @click="selectUserMenu($event, 'photos')">Фотографии</a></li>
                      <li><a @click="selectUserMenu($event, 'info_details')">Подробная информация</a></li>
                      <li><a @click="selectUserMenu($event, 'articles')">Статьи</a></li>
                      <li><a @click="selectUserMenu($event, 'messages')">Сообщения</a></li>
                      <li><a @click="selectUserMenu($event, 'declaration')">Объявления</a></li>
                      <li><a @click="selectUserMenu($event, 'documents')">Документы</a></li>
                      <li><a @click="selectUserMenu($event, 'orders')">Заказы</a></li>

                    </ul>
                </div>

            </aside>
          </div>
          <!--- ПРАВАЯ ПАНЕЛЬ ---->
          <div class="col-md-9 col-sm-6 col-xs-12"
               style="background: white; border: 1px #296dc1 solid; height: 100%" >
            <div class="blog-details-wrap" style="padding-top:20px;" >

              <template v-if="tab == 'info_details'">
                user_info_details
                {{ userTest }}
              </template>
              <template v-else-if="tab == 'photos'">

                <MultiFilesUploader
                  type="user"
                  :uid="userId"
                  @files_load="filesLoaded"
                ></MultiFilesUploader>

                <div>

                  <div class="row">
                    <div class="col-md-12 col-sm-6 col-xs-12 col">
                      <div class="footer-widget instagram-wrap">

                        <MediaManager :files="userFiles"
                                      :albums="fileAlbums"/>
                      </div>
                    </div>
                  </div>

                  <div>
                    <hr>
                  </div>
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
                <UserGeneralInfo/>
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

import { mapGetters, mapActions } from 'vuex'

import UserGeneralInfo from '@/components/user/UserGeneralInfo'
import UserAvatar from '@/components/user/UserAvatar'
import MultiFilesUploader from '@/components/MultiFilesUploader'
import MediaManager from '@/components/app/MediaManager'

export default {

  data: () => ({
    tab: 'user_info',
    emailVerifyCode: null,
    emailVerifyState: false,
    phoneVerifyState: false,
    newPassword: {
      password: '',
      repeat_pwd: ''
    },
    userFiles: [],
    fileAlbums: {},
  }),

  components: {
    UserGeneralInfo,
    MultiFilesUploader,
    UserAvatar,
    MediaManager
  },

  created () {
    this.getCurrentUserInfo()
    this.getRootFilesPath()
    this.fetchUsers()

    let f = location.href
    // debugger
  },

  mounted () {
    this.getUserFiles()
  },

  computed: {
    newPwdCompareWarn () {
      return this.compareNewPassword()
    }
  },

  methods: {

    ...mapActions([
      'fetchUser',
      'fetchUsers',
      'setUserId',
      'setPreloader',
      'setAlertInfo',
    ]),

    filesLoaded (response) {
      this.getUserFiles()
      this.saveResponse(response, 'Файлы успешно загружены', 'Не удалось загрузить файлы')
    },

    deleteFile (fileId) {
      this.setPreloader(true)
      const apiUrl = '/delete/file/' + fileId
      this.send(apiUrl, 'delete').then(response => {
        this.getUserFiles()
        this.saveResponse(response, 'Файл удален', 'Файл не получилось удалить')
      })
    },

    compareNewPassword () {
      if (this.newPassword.password != this.newPassword.repeat_pwd) {
        return 'Пароли не совпадают'
      }
      return ''
    },

    changePassword () {
      if (!this.changePasswordValidate()) return false
      const data = this.newPassword
      const apiUrl = '/post/user/change-password/' + this.userId
      this.setPreloader(true)
      this.send(apiUrl, 'put', data).then(response => {
        this.saveResponse(response, 'Пароль успешно изменен', 'Не удалось изменить пароль')
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
      const res = this.saveResponse(response, successMessage, errorMessage)
      if (fn) fn(res)
      return true
    },

    getUserFiles () {
      const apiUrl = '/user/get-files/' + this.userId
      this.send(apiUrl).then(response => {
        this.userFiles = response
        this.getFileAlbums(this.userFiles)
      })
    },

    getFileAlbums (files) {
      for (let i in files) {
        const file = files[i]
        if (file.folder_name) {
          this.fileAlbums[file.folder_name] = file.folder_name
        }
      }
    },

    selectUserMenu(event, tab){
      const activeClass = 'user-menu-active';
      let aMenuList = document.querySelectorAll('.user-profile-menu li a');
      this.htmlElemsRender(aMenuList, (elem) => {
        if(elem && elem.classList)
          elem.classList.remove(activeClass)
      });
      const target = event.target;
      target.classList.add(activeClass);
      this.tab = tab;
    },

  }

}
</script>

<style >

/*.user-menu ul li {*/
/*  cursor: pointer;*/
/*  line-height: 30px;*/
/*  border-bottom: 1px solid #f1f1f1;*/
/*}*/

.input-label {
  color: #296dc1;
  font-style: italic;
  border-bottom: 1px #296dc1 solid;
  display: flex;
}

.user-profile-menu li {
  border: 0px red solid;
  padding: 0px !important;
  list-style: none;
}


.user-profile-menu li a {
  font-size: 13px;
  font-weight: bold;
  color:white;
  cursor: pointer;
  display: block;
  text-decoration: none;
  padding:10px;
  width: 100%;
}

.user-profile-menu li a:hover {
  /*border-bottom: 1px red solid;*/
  color: orange;
}

.user-menu-active {
  background: white;
  color: black !important;
}

.about-wrap ul li:before {
  display: none;
  content: "";
}

</style>
