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
        :message="respMessage"
        :color="respColor"
      ></InfoMessage>
      <router-link v-if="respMessage" tag="a" to="/page/auth"
                   style="width:250px;display:block; color:green; margin: -19px 0px 10px 0px; border-bottom:1px greenyellow solid"
      >Перейти на страницу авторизации</router-link>


      <h3 class="sidebar-title" style="margin-top:10px" >Регистрация</h3>
      <hr/>

      <div class="col-md-12 col-xs-12">
        <div class="faq-form form-style" style="border:0px red solid; margin-bottom:20px;">

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
                    <input v-model="user.username" required="true" type="text" placeholder="Имя">
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

              <div class="col-xs-12"> <hr/></div>

              <div class="col-xs-12">

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
      preloaderState: false,
      preloaderMessage: 'Подождите, идет сохранение',

      user: {
        username: '',
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
      if (!this.validate())
        return false

      this.setPreloader(true)
      const postData = this.user
      const apiUrl = '/post/user/register'
      this.send(apiUrl, 'post', postData).then(this.registerResponseHandle)
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

      if (!this.user.username) {
        alert('Вы не прописали имя, это обязательное поле')
        return false
      }

      if (!this.user.login) {
        this.user.login = this.user.username
      }

      return true
    },

    registerResponseHandle(response) {
      const res = this.saveResponse(response, `Новый пользователь успешно создан`, 'Не удалось создать пользователя')
      if(res.status)
        this.$router.push('/page/auth')
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
