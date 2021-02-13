<template>
  <div class="header-bottom" id="sticky-header"
       style="height: 72px; padding: 0px; margin: 0px; border-top:1px #296dc1 solid; border-bottom:1px #296dc1 solid">

    <div class="container" style="padding: 0px;">
      <div class="row" style="margin: 0px !important; padding: -20px 0px 0px 0px !important; border:0px red solid;">

        <div class="hidden-md hidden-lg col-sm-8 col-xs-6">
          <div class="logo"><h1><a href="index.html">Martxa</a></h1></div>
        </div>

        <div class="col-md-11 hidden-sm hidden-xs"
             style="border:0px red solid; margin: -5px 0px 0px 0px; padding: 0px;">
          <div class="mainmenu" style="border:0px red solid;">
            <ul id="navigation" style="border:0px red solid;">

              <li class="active">
                <router-link tag="a" to="/">Главная</router-link>
              </li>

              <li v-for="(menu) in topMenu">
                <router-link tag="a" :to="menu.url">{{ menu.title }}</router-link>
              </li>

            </ul>
          </div>
        </div>

        <div class="col-md-1 col-sm-2 col-xs-3" style="margin: -5px 0px 0px 0px; padding: 0px;">
          <div class="search-wrap text-right">
            <ul>
              <li><a href="#"><i class="fa fa-search"></i></a></li>
            </ul>
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
        {url: '/page/users-list', title: 'Пользователи'},
        {url: '/page/profile', title: 'Профиль'},
        {url: '/page/register', title: 'Регистрация'},
        {url: '/page/admin-panel', title: 'Admin'},
      ]
    }
  },

  mounted() {
    $(document).ready(function () {

      $(".mainmenu li").click(function () {
        // $(".mainmenu > #navigation > ul > li").removeClass( "active")
        // $(this).addClass("active")
      })

    })
  }

}
</script>

<style scoped>

</style>


<!--              <li><a href="service.html">Service <i class="fa fa-angle-down"></i></a>-->
<!--                <ul class="submenu">-->
<!--                  <li><a href="service.html">service One</a></li>-->
<!--                  <li><a href="service2.html">service Two</a></li>-->
<!--                  <li><a href="single-service.html">service Single</a></li>-->
<!--                </ul>-->
<!--              </li>-->

<!--              <li><a href="#">Pages <i class="fa fa-angle-down"></i></a>-->
<!--                <ul class="megamenu">-->
<!--                  <li>-->
<!--                      <a class="mega-title" href="#">MegaMenu Title</a>-->
<!--                      <ul>-->
<!--                        <li><a href="about.html">About One</a></li>-->
<!--                        <li><a href="about2.html">About Two</a></li>-->
<!--                        <li><a href="service.html">service One</a></li>-->
<!--                        <li><a href="service2.html">service Two</a></li>-->
<!--                        <li><a href="single-service.html">service Single</a></li>-->
<!--                      </ul>-->
<!--                  </li>-->

<!--                  <li>-->
<!--                      <a class="mega-title" href="#">MegaMenu Title</a>-->
<!--                      <ul>-->
<!--                        <li><a href="testmonial.html">Testmonial One</a></li>-->
<!--                        <li><a href="team.html">Team page</a></li>-->
<!--                        <li><a href="commingsoon.html">Comming Soon</a></li>-->
<!--                      </ul>-->
<!--                  </li>-->

<!--                </ul>-->
<!--              </li>-->
