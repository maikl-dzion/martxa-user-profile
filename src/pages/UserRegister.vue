<template>
  <div>

    <header class="header-area">
      <HeaderTop/>
    </header>

    <Preloader
      :preloader="preloader"
      :message="preloaderMessage"
    ></Preloader>

    <div class="container">

      <InfoMessage
        :message="respMessage"
        :color="respColor"
      ></InfoMessage>
      <router-link v-if="respMessage" tag="a" to="/page/auth"
                   style="width:250px;display:block; color:green; margin: -19px 0px 10px 0px; border-bottom:1px greenyellow solid"
      >Перейти на страницу авторизации</router-link>


      <h3 class="sidebar-title">Регистрация</h3>
      <hr/>

      <div class="col-md-12 col-xs-12">
        <div class="faq-form form-style">

          <form id="cf" @submit.prevent="">
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
                    <input v-model="user.name" required="true" type="text" placeholder="Имя">
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
                  <div class="col-xs-8">
                    <input v-model="user.email" required="true" type="text" placeholder="Email">
                  </div>
                </div>
              </div>

              <div class="col-xs-12">
                <div class="row">
                  <div class="col-xs-4">
                    <div class="input-label">
                      <div>Пароль</div>
                      <div style="color:red; font-weight: bold; margin-left:10px;">*</div>
                    </div>
                  </div>
                  <div class="col-xs-8">
                    <input v-model="user.password" required="true" type="text" placeholder="Пароль">
                  </div>
                </div>
              </div>

              <div class="col-xs-12">
                <div class="row">
                  <div class="col-xs-4">
                    <div class="input-label">Логин</div>
                  </div>
                  <div class="col-xs-8">
                    <input v-model="user.login" type="text" placeholder="Логин">
                  </div>
                </div>
              </div>

              <div class="col-xs-12">
                <div class="row">
                  <div class="col-xs-4">
                    <div class="input-label">Телефон</div>
                  </div>
                  <div class="col-xs-8">
                    <input v-model="user.phone" type="text" placeholder="Телефон">
                  </div>
                </div>
              </div>

              <!--            <div class="col-xs-12">-->
              <!--              <span>Your Questions</span>-->
              <!--              <textarea class="contact-textarea" placeholder="Questions" id="msg" name="msg"></textarea>-->
              <!--            </div>-->

              <div class="col-xs-12">
                <hr/>
                <button @click="save()" id="submit"
                        class="cont-submit btn-contact btn-style" name="submit">Сохранить
                </button>
              </div>

            </div>
          </form>

        </div>
      </div>

    </div> <!--- form container -->


    <Footer/>

  </div>
</template>

<script>

import HeaderTop from '../components/app/HeaderTop'
// import HeaderMiddle from '../components/app/HeaderMiddle'

import Footer from '../components/app/Footer'

export default {
  name: 'UserRegister',
  data() {
    return {

      respMessage: '',
      respColor: '',
      preloader: false,
      preloaderMessage: 'Подождите, идет сохранение',

      user: {
        name: '',
        email: '',
        password: '',
        login: '',
        phone: '',
      }
    }
  },

  components: {
    HeaderTop, Footer
  },

  methods: {

    save() {

      if (!this.validate()) {
        return false
      }

      this.preloader = true
      const postData = this.user
      const apiUrl = '/post/user/register'
      this.send(apiUrl, 'post', postData)
        .then(this.saveResponseHandle)
    },

    validate() {
      if (!this.user.email) {
        alert('Вы не прописали email, это обязательное поле')
        return false
      }

      if (!this.user.password) {
        alert('Вы не установили пароль, это обязательное поле')
        return false
      }

      if (!this.user.name) {
        alert('Вы не прописали имя, это обязательное поле')
        return false
      }

      if (!this.user.login) {
        this.user.login = this.user.name
      }

      return true
    },

    saveResponseHandle(response) {
      this.preloader = false
      const resp = this.saveResponse(response)
      this.respColor = ''
      this.respMessage = `Новый пользователь успешно создан`
      if (!resp.status) {
        this.respMessage = 'Не удалось создать пользователя -' + resp.error
        this.respColor = 'red'
        return false
      }
      // this.saveRespClear()
      // this.$router.push('/page/auth')
    },

    saveRespClear() {
      this.setTimer(() => {
        this.respMessage = ''
        this.respColor = ''
      })
    },

  } // --- methods

}
</script>

<style>
.input-label {
  color: #296dc1;
  font-style: italic;
  border-bottom: 1px #296dc1 solid;
  display: flex;
}
</style>
