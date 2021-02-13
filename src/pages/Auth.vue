<template>
  <div>

    <header class="header-area">
      <HeaderTop/>
    </header>

    <Preloading
      :preloader="preloaderState"
      :message="preloaderMessage"
    ></Preloading>

    <div class="container">

      <InfoMessage
        :message="responseMessage"
        :color="responseColor"
      ><div v-if="response.error" >{{response.error}}</div>
      </InfoMessage>

      <h3 class="sidebar-title" style="margin-top:10px" >Авторизация</h3><hr/>

      <div class="col-md-12 col-xs-12">
        <div class="faq-form form-style" style="border:0px red solid; margin-bottom:20px;">
        <form  @submit.prevent="" ><div class="row">

              <div class="col-xs-12">
                <div class="row">
                  <div class="col-xs-2">
                    <div class="input-label">
                      <div>Email</div>
                    </div>
                  </div>
                  <div class="col-xs-5">
                    <input v-model="authData.email" required="true" type="text" placeholder="Email">
                  </div>
                </div>
              </div>

              <div v-if="!forgotPwd" class="col-xs-12">
                <div class="row">
                  <div class="col-xs-2">
                    <div class="input-label">
                      <div>Пароль</div>
                    </div>
                  </div>
                  <div class="col-xs-5">
                    <input v-model="authData.password" required="true" type="text" placeholder="Пароль">
                  </div>
                </div>
              </div>

              <div class="col-xs-12"><hr/></div>

              <div v-if="!forgotPwd" class="col-xs-12">
                <div class="row">
                  <div class="col-xs-3">
                     <button @click="auth()" name="submit"
                            class="cont-submit btn-contact btn-style" > Войти</button>
                  </div>
                  <div class="col-xs-9">
                     <a @click="forgotPwd = true"
                            class="cont-submit btn-contact btn-style" > Забыли пароль? </a>
                  </div>
                </div>
              </div>

              <div v-if="forgotPwd" class="col-xs-12">
                <div class="row">
                  <div class="col-xs-4">
                    <button @click="forgotYouPwd()"
                            class="cont-submit btn-contact btn-style" > Сбросить пароль</button>
                  </div>
                </div>
              </div>

        </div></form>
      </div></div>

    </div> <!--- form container -->

    <footer>
      <div class="footer-top">
        <div class="container">
          <div class="row">
            <div class="col-md-3 col-sm-6 col-xs-12  col wow fadeInUp" data-wow-delay=".1s">
              <div class="footer-widget footer-logo">
                <h1>Bolderfest.ru</h1>
                <p>Приветствум Вас на этом сайте</p>
                <ul>
                  <li><i class="fa fa-phone"></i> +7 906 248 62 09</li>
                  <li><i class="fa fa-envelope"></i> dzion67@mail.ru</li>
                </ul>
              </div>
            </div>

            <div class="col-md-3 col-sm-6 col-xs-12 col wow fadeInUp" data-wow-delay=".4s">
              <div class="footer-widget quick-contact">
                <h2>Обратная связь</h2>
                <form action="#">
                  <input type="text" placeholder="Full Name">
                  <input type="email" placeholder="Email">
                  <textarea name="massage" id="massage" cols="30" rows="10" placeholder="Massage"></textarea>
                  <button type="button" name="button" class="btn-style">Send</button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="footer-bottom text-center">
        <div class="container">
          <div class="row">
            <div class="col-xs-12">
              Copyright &copy; 2021
            </div>
          </div>
        </div>
      </div>
    </footer>

  </div>

</template>

<script>

import HeaderTop from '../components/app/HeaderTop'
//import Footer from '../components/app/Footer'

export default {
  data: () => ({
    forgotPwd : false,
    response: [],
    preloaderMessage : 'Подождите,идет запрос к серверу',
    authData: {
      email: '',
      password: ''
    }
  }),

  components: {
    HeaderTop,
    //Footer
  },

  methods: {

    auth() {
      this.preloaderState = true
      const postData = this.authData
      const apiUrl = '/post/auth/login'
      this.send(apiUrl, 'post', postData).then(this.authResponseHandle)
    },

    forgotYouPwd() {
        this.preloaderState = true
        const apiUrl = '/user/forgot-password/' + this.authData.email
        this.send(apiUrl).then(response => {
             this.preloaderState = false
             let resp = response;
        })
    },

    authResponseHandle(resp) {
      this.preloaderState = false
      this.response = resp
      if (!resp.status || !resp.token) {
        this.responseMessage = 'Не удалось авторизовать пользователя, попробуйте еще раз'
        this.responseColor = 'red'
        return false
      }

      this.setToken(resp.token)
      this.store('user_name', resp.user.name)
      this.store('user_id', resp.user.user_id)
      this.sendEventBus('auth_event', {user_id: resp.user.user_id})
      this.$router.push('/page/profile')
    },

  } // methods

}
</script>
