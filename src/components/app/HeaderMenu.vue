<template><div>

  <div class="header-bottom"
       style="margin-bottom:10px;">

    <div class="col-sm-12 col-xs-12 slicknav_nav my__hidden-top-menu"
         style="margin-bottom: 20px; ">
      <div class="logo">
        <h1>
          <router-link tag="a" to="/"
                       style="font-size: 17px; color:white">На главную
          </router-link>
        </h1>
      </div>
      <div style="margin: 0px 0px 20px 0px">
        <ul>
          <template v-for="(menu) in topMenu">
            <router-link tag="li" :to="menu.url" active-class="active">
              <a style="font-size: 17px">{{ menu.title }}</a>
            </router-link>
          </template>
        </ul>
      </div>
    </div>

    <div class="container" style="padding: 0px;">
      <div class="row" style="">

        <div class="col-md-11 hidden-sm hidden-xs my__visible-top-menu">
          <div class="mainmenu">

            <ul id="navigation">

              <template v-for="(menu) in topMenu">
                <router-link tag="li" :to="menu.url" active-class="active">
                  <a style="font-size: 14px;">{{ menu.title }}</a>
                </router-link>
              </template>

              <li><a> Сервисы <i class="fa fa-angle-down"></i></a>
                <ul class="submenu">
                  <li><a href="http://bolderfest.ru/pg-admin-interface/v2"
                         target="_blank"> Web Postgres</a></li>

                  <li><a href="http://bolderfest.ru/faximile/front/app"
                         target="_blank"> Faximile </a></li>

                  <li><a href="http://bolderfest.ru/pg-admin-interface/v2"
                         target="_blank"> Web Postgres</a></li>

                  <li><a href="http://bolderfest.ru/FindText"
                         target="_blank"> Find Text</a></li>

                  <li><a href="http://bolderfest.ru/iac-dashboard"
                         target="_blank"> Widget Dashboard</a></li>

                  <li><a href="http://bolderfest.ru/basisportal/web"
                         target="_blank"> Children Portal</a></li>

                </ul>
              </li>

            </ul>

          </div>
        </div>

        <div class="col-md-1 col-sm-2 col-xs-3 my__visible-top-menu " style="margin: -5px 0px 0px 0px; padding: 0px;">
          <div class="search-wrap text-right">
            <ul><li><a href="#"><i class="fa fa-search"></i></a></li></ul>
          </div>
        </div>

      </div>
    </div>


  </div>

</div></template>

<script>
export default {
  name: 'HeaderMenu',

  data () {
    return {
      topMenu: [
        // {url: '/', title: 'Главная'},
        { url: '/user-profile', title: 'Профиль' },
        { url: '/users-list', title: 'Пользователи' },
        { url: '/bulletin-board', title: 'Доска объявлений' },
        { url: '/task-board', title: 'Доска задач' },
        // {url: '/page/register', title: 'Регистрация'},
        { url: '/admin-panel', title: 'Admin Panel' },
        { url: '/tests', title: 'Tests' },
      ]
    }
  },

}
</script>

<style scoped>

.header-bottom {

  /*height: 55px;*/
  /*padding: 0px;*/
  /*margin: 0px;*/
  /*border-top: 1px #296dc1 solid;*/
  /*border-bottom: 1px #296dc1 solid;*/
  /*box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); !* Параметры тени *!*/

}

.col-md-11 {
  border: 0px red solid;
  margin: -2px 0px;
  padding: 0px;
}

.mainmenu ul li > a:hover {
  background: none;
  color: white;
  /*background: #77adef;*/
  background: #296dc1;
}

.mainmenu ul li > a {
  font-weight: bold;
  padding: 13px 14px;
}

.search-wrap ul li {
  height: 57px;
  line-height: 57px;
  margin: 0px;
  padding: 0px;
}

.mainmenu ul li > a:before {
  bottom: 18px;
}

.mainmenu ul li > a:after {
  bottom: 14px;
}


.my__hidden-top-menu {
  display: none;
  background: #296dc1;
}

@media screen and (max-width: 990px) {
  .my__hidden-top-menu {
    display: block;
  }

  .my__visible-top-menu {
    display: none;
  }
}

</style>
