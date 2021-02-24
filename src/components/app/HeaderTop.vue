<template>

    <div class="header-top bg-2" style="height: 40px; padding: 0px 0px 0px 0px; margin: 0px;">
      <div class="container" style="height: 100%; padding-top: 5px;" >
        <div class="row" >
          <div class="col-md-6 col-sm-8 col-xs-12" >
            <div class="header-top-left" >
              <p>Добро пожаловать на сайт!</p>
            </div>
          </div>
          <div class="col-md-6 col-sm-4 col-xs-12">
            <div class="header-top-right text-right">
              <ul>
                <li><router-link tag="a" to="/" >На главную</router-link></li>
                <li><span style="color:white" >|</span></li>
                <li><router-link tag="a" to="/page/register" >Регистрация</router-link></li>
                <li><span style="color:white" >|</span></li>
                <template v-if="userId" >
                  <li><a @click="logout" href="#" >Выход</a></li>
                  <li><span style="color:white" >|</span></li>
                  <li> <div style="color:white;">
                       <i class="fa fa-user" > {{userInfo.username}} ({{userInfo.user_id}})</i>
                  </div> </li>
                </template>
                <template v-else >
                  <li><router-link tag="a" to="/page/auth" >Войти</router-link></li>
                </template>

<!--                <li><a href="#"><i class="fa fa-facebook"></i></a></li>-->
<!--                <li><a href="#"><i class="fa fa-twitter"></i></a></li>-->
<!--                <li><a href="#"><i class="fa fa-linkedin"></i></a></li>-->
<!--                <li><a href="#"><i class="fa fa-google-plus"></i></a></li>-->
<!--                <li><a href="#"><i class="fa fa-youtube"></i></a></li>-->

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'Header',
  data () { return {
      userId   : 0,
      userName : '',
  }},

  methods: {

    logout () {
        this.userId = 0
        this.storeRemove('user_name')
        this.storeRemove('user_id')
        this.setToken(null)
        this.fetchUser(0)
        this.$router.push('/page/auth')
    }

  },

  mounted () {
    this.getEventBus('auth_event', resp => {
       this.userId = resp.user_id
    })
  }
}
</script>

<style scoped>

</style>
