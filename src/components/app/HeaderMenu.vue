<template>
  <div class="header-bottom" id="sticky-header">

    <div class="container" style="padding: 0px;">
      <div class="row" style="margin:0px !important; padding:0px !important; border:0px red solid;">

        <div class="hidden-md hidden-lg col-sm-8 col-xs-6">
            <div class="logo" style="font-size: 14px"><h1>
              <router-link tag="a" to="/" >На главную</router-link>
            </h1></div>
            <div style="margin: 0px 0px 20px 0px" ><ul>
                <template v-for="(menu) in topMenu" >
                  <router-link tag="li" :to="menu.url" active-class="active"  >
                    <a style="font-size: 17px" >{{ menu.title }}</a>
                  </router-link>
                </template>
            </ul></div>
        </div>

        <div  class="col-md-11 hidden-sm hidden-xs" >
              <div class="mainmenu" >
                <ul id="navigation" >
                    <template v-for="(menu) in topMenu" >
                        <router-link tag="li" :to="menu.url" active-class="active"  >
                             <a style="">{{ menu.title }}</a>
                        </router-link>
                    </template>
                </ul>
              </div>
        </div>

        <div class="col-md-1 col-sm-2 col-xs-3" style="margin: -5px 0px 0px 0px; padding: 0px;">
          <div class="search-wrap text-right">
            <ul><li><a href="#"><i class="fa fa-search"></i></a></li></ul>
          </div>
        </div>

        <div class="col-sm-2 clear col-xs-3 hidden-md hidden-lg">
          <div class="responsive-menu-wrap floatright"></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderMenu",

  data() {
    return {
      topMenu: [
        // {url: '/', title: 'Главная'},
        {url: '/page/profile', title: 'Профиль'},
        {url: '/page/users-list', title: 'Пользователи'},
        // {url: '/page/register', title: 'Регистрация'},
        {url: '/page/admin-panel', title: 'Admin'},
        {url: '/page/tests', title: 'Tests'},
      ]
    }
  },

}
</script>

<style scoped>

.header-bottom {
  height: 55px;
  padding: 0px; margin: 0px;
  border-top:1px #296dc1 solid;
  border-bottom:1px #296dc1 solid;
  box-shadow: 0 0 10px rgba(0,0,0,0.5); /* Параметры тени */
}

.col-md-11 {
  border:0px red solid; margin:-2px 0px; padding:0px;
}

.mainmenu ul li > a:hover {
  background: none;
  color: #296dc1;
  background: lightgray;
}

.mainmenu ul li > a {
  font-weight: 500;
  padding: 13px 14px;
}

.search-wrap ul li {
  height: 57px;
  line-height: 57px;
  margin: 0px; padding: 0px;
}

.mainmenu ul li > a:before {
  bottom: 18px;
}

.mainmenu ul li > a:after {
  bottom: 14px;
}

</style>
