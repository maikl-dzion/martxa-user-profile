<template>
  <div>

    <header class="header-area">
      <HeaderTop/>
    </header>

    <div class="container">

      <InfoMessage style="max-width: 100%"
        :message="responseMessage"
        :color="responseColor" >
          <div v-if="response.error"
               v-html="response.error"></div>
      </InfoMessage>

      <h3 class="sidebar-title" style="margin-top:10px">Авторизация</h3><hr/>

      <div class="col-md-12 col-xs-12">
        <div class="faq-form form-style" style="border:0px red solid; margin-bottom:20px;">
          <form @submit.prevent="">
            <div class="row">

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

              <div class="col-xs-12">
                <hr/>
              </div>

              <div v-if="!forgotPwd" class="col-xs-12">
                <div class="row">
                  <div class="col-xs-3">
                    <button @click="auth()" name="submit"
                            class="cont-submit btn-contact btn-style"> Войти
                    </button>
                  </div>
                  <div class="col-xs-9">
                    <a @click="forgotPwd = true"
                       class="cont-submit btn-contact btn-style" style="cursor: pointer;" > Забыли пароль? </a>
                  </div>
                </div>
              </div>

              <div v-if="forgotPwd" class="col-xs-12">
                <div class="row">
                  <div class="col-xs-4">
                    <button @click="forgotYouPwd()"
                            class="cont-submit btn-contact btn-style"> Сбросить пароль
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </form>

        </div>
      </div>

    </div> <!--- form container -->

    <footer>
      <div class="footer-top">
        <div class="container">
          <div class="row">
            <div class="col-md-3 col-sm-6 col-xs-12  col wow fadeInUp" data-wow-delay=".1s">
              <div class="footer-widget footer-logo">
                <h1>Bolderfest.ru</h1>
                <p>Приветствуем Вас на сайте</p>
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

import { mapActions } from 'vuex'
import HeaderTop from '../components/app/HeaderTop'

export default {
  data: () => ({
    forgotPwd: false,
    response: [],
    preloaderMessage: 'Подождите,идет запрос к серверу',
    authData: {
      email: '',
      password: ''
    }
  }),

  components: {
    HeaderTop,
  },

  methods: {

    ...mapActions([
        'fetchUser',
        'fetchUsers',
        'setUserId',
        'setUserInfo',
        'setPreloader',
        'setAlertInfo',
    ]),

    forgotYouPwd () {
      this.setPreloader(true)
      const apiUrl = '/user/forgot-password/' + this.authData.email
      this.send(apiUrl).then(response => {
         this.setPreloader(false)
         let message = 'Не удалось сбросить пароль, попробуйте еще раз'
         let color   = 'red'
         if(response.save_result) {
           message = `На почту отправлено письмо с новым паролем <br/> (После входа необходимо изменить пароль) <br/> Если письмо не пришло, посмотрите в папке 'Спам'`;
           color   = 'green';
           this.forgotPwd = false;
         }
         this.responseMessage = message;
         this.responseColor   = color;
      })
    },

    auth () {
        this.setPreloader(true)
        const postData = this.authData
        const apiUrl = '/post/auth/login'
        this.send(apiUrl, 'post', postData).then(this.authResponseHandle)
    },

    authResponseHandle (response) {
        this.setPreloader(false)
        this.response = [];
        this.responseMessage = '';
        this.responseColor = '';

        if (!response.status || !response.token) {
          this.responseMessage = 'Не удалось авторизовать пользователя, попробуйте еще раз'
          this.responseColor   = 'red'
          return false
        }

        this.response = response
        const user    = response.user;
        const token   = response.token;
        this.setUserInfoInit(user, token);

        this.$router.push('/user-profile')

    },

    setUserInfoInit(user, token) {

      this.setUserId(user.user_id)
      this.setUserInfo(user)
      this.fetchUsers()

      this.setToken(token)
      this.store('user_name', user.username)
      this.store('user_id',   user.user_id)
      this.sendEventBus('user-auth-success', { user_id: user.user_id })
    },

  } // methods

}
</script>
