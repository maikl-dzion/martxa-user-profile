<template>
  <page-template>

    <!-- blog-details-area start -->
    <section class="blog-details-area ptb-10" style="border:0px red solid; ">

      <Preloader
        :preloader="preloader"
        :message="preloaderMessage"
      ></Preloader>

      <InfoMessage
        :message="responseMessage"
        :color="responseColor"
      ></InfoMessage>

      <div class="container">
        <div class="row">

          <!--- ЛЕВАЯ ПАНЕЛЬ ---->
          <div class="col-md-3 col-sm-6 col-xs-12" style="border:0px red solid ">
            <aside class="left-sidebar">

              <!--- Avatar --->
              <div class="author-wrap">
                <div class="author-img">
                  <img src="/assets/images/user-not-photo.jpg" alt="" style="border-radius: 0px">
                  <span>Загрузить фото</span>
                  <input type="file" name="user-avatar" placeholder="Загрузить фото">
                </div>
                <div class="author-info">
                  <h4>{{ userInfo.name }}</h4>
                  <span>логин : {{ userInfo.login }}</span>
                  <!--                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, molestiae.</p>-->
                  <p>Дата регистрации: <br>{{ userInfo.created_at }}</p>
                </div>
              </div>

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
                  <li><a @click="tab = 'info_details'">Подробная информация</a></li>
                  <li><a @click="tab = 'articles'">Статьи</a></li>
                  <li><a @click="tab = 'photos'">Фотографии</a></li>
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
                user_photos
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
              <template v-else>
                <!---  Основная информация о пользователе --->
                <UserGeneralInfo/>
                <!--- ./ Основная информация о пользователе --->
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

export default {

  data: () => ({
    tab: null,

    emailVerifyCode: '',
    emailVerifyState: false,

    phoneVerifyState: false,
    newPassword: {
      password: '',
      repeat_pwd: ''
    }
  }),

  components: {
    UserGeneralInfo
  },

  created () {
    this.getCurrentUserInfo()
  },

  mounted () {
    this.getUserInfo()
    this.getUsersList()
  },

  computed: {
    newPwdCompareWarn () {
      return this.compareNewPassword()
    }
  },

  methods: {

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

      this.preloader = true
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
      this.preloader = false
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
    }

    // reset () {
    //   let linkItem = { link: '', code: '', user_id: 0 }
    //   this.linkItem = Object.assign({}, linkItem)
    // },

    // selectLink (item) {
    //   this.linkItem = Object.assign({}, item)
    //   this.saveType = 'update'
    //   this.selectLinkId = item.link_id
    // },
    //
    // addlink () {
    //   const apiUrl = '/post/add/link'
    //   this.send(apiUrl, 'post', this.linkItem).then(this.saveResponseHandle)
    // },
    //
    // updatelink () {
    //   const apiUrl = '/post/update/link/' + this.selectLinkId
    //   this.send(apiUrl, 'put', this.linkItem).then(this.saveResponseHandle)
    // },
    //
    // deletelink (linkId) {
    //   const apiUrl = '/post/delete/link/' + linkId
    //   this.send(apiUrl, 'delete', this.linkItem).then(this.saveResponseHandle)
    // },
    //
    // getLinksByUserId () {
    //   if (!this.userId) return false
    //   const apiUrl = '/get/links/' + this.userId
    //   this.send(apiUrl).then(response => {
    //     this.userLinkItems = response.result
    //   })
    // },

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
