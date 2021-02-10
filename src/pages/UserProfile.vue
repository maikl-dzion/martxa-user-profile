<template>
<page-template>

      <!-- blog-details-area start -->
      <section class="blog-details-area ptb-10" style="border:0px red solid; " >

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
            <div class="col-md-3 col-sm-6 col-xs-12" style="border:0px red solid "  >
              <aside class="left-sidebar">

                <!--- Avatar --->
                <div class="author-wrap">
                  <div class="author-img">
                    <img src="/assets/images/user-not-photo.jpg" alt="" style="border-radius: 0px" >
                    <span>Загрузить фото</span>
                    <input type="file" name="user-avatar" placeholder="Загрузить фото">
                  </div>
                  <div class="author-info">
                    <h4>{{userInfo.name}}</h4>
                    <span>логин : {{userInfo.login}}</span>
<!--                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, molestiae.</p>-->
                    <p>Дата регистрации: <br>{{userInfo.created_at}}</p>
                  </div>
                </div>

                <div class="search-sidebar mb-20">
                  <form action="#">
                    <input type="text" name="search" placeholder="Search Here">
                    <button type="button" name="button"><i class="fa fa-search"></i></button>
                  </form>
                </div>

                <div class="category-wrap mb-30 user-menu">
                  <h3 class="sidebar-title">Меню пользователя</h3>
                  <ul>
                    <li><a @click="tab = 'user_info'"    >Основная информация</a></li>
                    <li><a @click="tab = 'info_details'" >Подробная информация</a></li>
                    <li><a @click="tab = 'articles'"     >Статьи</a></li>
                    <li><a @click="tab = 'photos'"       >Фотографии</a></li>
                    <li><a @click="tab = 'orders'"       >Заказы</a></li>
                    <li><a @click="tab = 'change_password'"  >Изменить пароль</a></li>
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

                <template v-if="tab == 'info_details'" >
                  user_info_details
                </template>
                <template v-else-if="tab == 'photos'" >
                  user_photos
                </template>
                <template v-else-if="tab == 'articles'" >
                  user_articles
                </template>
                <template v-else-if="tab == 'orders'" >
                  user_orders
                </template>
                <template v-else-if="tab == 'change_password'" >

                  <h3 class="sidebar-title" style="font-style: italic; font-size: 17px" >Изменить пароль</h3><hr/>
                  <div class="col-md-12 col-xs-12"><div class="faq-form form-style">
                    <form @submit.prevent="" ><div class="row">

                      <div class="col-xs-12">
                        <div class="row">
                          <div class="col-xs-3">
                            <div class="input-label"><div>Новый пароль</div></div>
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
                            <div class="input-label"><div>Повторить пароль</div></div>
                          </div>
                          <div class="col-xs-5">
                            <input v-model="newPassword.repeat_pwd"
                                   required="true" type="text" placeholder="Новый пароль">
                          </div>
                        </div>
                      </div>

                      <div class="col-xs-12" style="color:red" >
                         {{newPwdCompareWarn}}
                      </div>

                      <div class="col-xs-12"><hr/>
                        <button @click="changePassword()"
                                class="cont-submit btn-contact btn-style" name="submit"> Изменить пароль
                        </button>
                      </div>

                    </div></form>
                  </div></div>

                </template>
                <template v-else >

                  <div class="blog-details-content">

                    <h3 class="sidebar-title" style="font-style: italic; font-size: 17px" >Основная информация</h3><hr/>

                    <div class="faq-form form-style" style="border:0px red solid; margin-bottom:20px;" >
                      <form id="user-general-info" @submit.prevent="">
                        <div class="row">

                          <div class="col-xs-12">
                            <div class="row">
                              <div class="col-xs-4">
                                <div class="input-label">
                                  <div>Имя пользователя</div>
                                  <div style="color:red; font-weight: bold; margin-left:10px;">*</div>
                                </div>
                              </div>
                              <div class="col-xs-8">
                                <input v-model="userInfo.name" required="true" type="text" placeholder="Имя">
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12">
                            <div class="row">
                              <div class="col-xs-4">
                                <div class="input-label">
                                  <div>Email</div>
                                  <div style="color:red; font-weight: bold; margin-left:10px;">*</div>
                                </div>
                              </div>
                              <div class="col-xs-6">
                                <input v-model="userInfo.email" required="true" type="text" placeholder="Email">
                              </div>
                              <div class="col-xs-2">
                                <a @click="emailVerify()" style="cursor:pointer"
                                        class="cont-submit btn-contact btn-style" >Заверить</a>
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12">
                            <div class="row">
                              <div class="col-xs-4">
                                <div class="input-label">Логин</div>
                              </div>
                              <div class="col-xs-8">
                                <input v-model="userInfo.login" type="text" placeholder="Логин">
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12">
                            <div class="row">
                              <div class="col-xs-4">
                                <div class="input-label">Телефон</div>
                              </div>
                              <div class="col-xs-6">
                                <input v-model="userInfo.phone" type="text" placeholder="Телефон">
                              </div>
                              <div class="col-xs-2">
                                <a @click="phoneVerify()" style="cursor:pointer"
                                   class="cont-submit btn-contact btn-style" >Заверить</a>
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12">
                            <div class="row">
                              <div class="col-xs-4"><div class="input-label">Роль</div></div>
                              <div class="col-xs-8">
                                <input v-model="userInfo.role" type="text" placeholder="Роль" disabled>
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12">
                            <div class="row">
                              <div class="col-xs-4"><div class="input-label">О себе</div></div>
                              <div class="col-xs-8">
                                 <textarea v-model="userInfo.note" class="contact-textarea"
                                           placeholder="О себе" id="msg" name="msg"></textarea>
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12"><hr/></div>

                          <div class="col-xs-12">
                            <button @click="saveUserInfo()"
                                    class="cont-submit btn-contact btn-style" >Сохранить</button>
                          </div>

                        </div>
                      </form>
                    </div>

                    <pre>{{userInfo}}</pre>
                    <pre>{{usersList}}</pre>

                    <p>This is Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Exce</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dolorum aspernatur ipsam, cumque. Quod autem iste dolorem explicabo nobis neque unde, laboriosam voluptatum cupiditate quam, corrupti ipsum accusantium sed eaque!</p>
                    <blockquote >
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam iure laborum natus ab, dolor, optio qui voluptatem voluptate assumenda perferendis! Officiis atque ad veniam voluptas reiciendis laborum! Nostrum in, modi.
                    </blockquote>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                    <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. </p>
                    <ul>
                      <li>Sed ut perspiciatis unde omnis</li>
                      <li>Lingues es membres del sam familie</li>
                      <li>Lorem ipsum dolor sit amet</li>
                      <li>This is Lorem ipsum dolor sit amet</li>
                      <li>consectetur adipisicing elit</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique explicabo placeat voluptates harum incidunt fugit commodi illum ipsam porro sapiente rerum neque provident, ducimus iure, dolorum fugiat vero nam quidem architecto quae sint. Corporis cupiditate laborum eius exercitationem nesciunt quis magnam eum dolorem quo odio?</p>
                  </div>

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
export default {

  data: () => ({
    tab: null,
    newPassword: {
      password: '',
      repeat_pwd: ''
    }
  }),

  created () {
    this.getCurrentUserInfo()
  },

  mounted () {
    this.getUserInfo()
    this.getUsersList()
  },

  computed : {
      newPwdCompareWarn() {
          return this.compareNewPassword()
      }
  },

  methods: {

    // save () {
    //
    // },
    //
    // saveResponseHandle (response) {
    //   const resp = this.saveResponse(response)
    //   if (resp.status) {
    //     alert('Успешное изменение')
    //   } else {
    //     alert('Не удалось изменить -' + resp.error)
    //   }
    //   this.afterSaveActions()
    // },
    //
    // afterSaveActions () {},

    emailVerify() {

    },

    phoneVerify() {

    },

    compareNewPassword() {
      if(this.newPassword.password != this.newPassword.repeat_pwd)
        return 'Пароли не совпадают'
      return ''
    },

    changePassword () {

      let message = this.compareNewPassword()

      if(message) {
        this.responseMessage = message
        this.responseColor = 'red'
        return false
      }

      this.preloader = true
      this.responseColor = ''
      const data = this.newPassword

      const apiUrl = '/post/user/change-password/' + this.userId
      this.send(apiUrl, 'put', data).then(response => {
        this.preloader = false
        const resp = this.saveResponse(response)
        if (resp.status) {
          this.responseMessage = 'Пароль успешно изменен'
        } else {
          this.responseMessage = 'Не удалось изменить -' + resp.error
          this.responseColor = 'red'
        }
      })
    },

    saveUserInfo() {

        this.responseColor = ''
        this.preloader = true

        const data = this.userInfo
        const apiUrl = '/post/user/update/' + this.userId
        this.send(apiUrl, 'put', data).then(this.responseUserInfoHandle)

    },

    responseUserInfoHandle(response) {

      this.preloader = false
      this.getUserInfo()

      const state = this.saveResponse(response)
      if (!state.status) {
        this.responseMessage = 'Не удалось обновить данные пользователя -' + state.error
        this.responseColor = 'red'
        return false
      }
      this.responseMessage = `Данные пользователя обновлены`
    },

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
}

.input-label {
  color: #296dc1;
  font-style: italic;
  border-bottom: 1px #296dc1 solid;
  display: flex;
}

</style>
