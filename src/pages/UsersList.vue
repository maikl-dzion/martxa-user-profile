<template>
  <page-template>
    <section class="blog-area1 ptb-1403 bg-3" style="border: 0px red solid">
      <div class="container-fluid" style="border: 0px green solid">
        <div class="row" style="border: 0px blue solid">

          <div class="col-md-9 col-xs-12">
            <div class="row">
              <template v-for="(user) in getUsers">
                <div class="col-sm-4 col-xs-12 col">
                  <div class="blog-wrap mb-30">

                    <div class="blog-img">
                      <img v-if="user.photo" :src="user.photo" style="width: 255px; height:255px;">
                      <img v-else :src="assetsUrl + '/images/user-not-photo.jpg'" style="width: 255px; height:255px;">
                    </div>

                    <div class="blog-content">

                      <div class="blog-meta">
                        <ul>
                          <li><a href="#"><i class="fa fa-user"></i> {{ user.login }}</a></li>
                          <li><a href="#"><i class="fa fa-comment"></i> 5 Comment</a></li>
                          <li><a href="#"><i class="fa fa-heart"></i> {{ user.phone }}</a></li>
                        </ul>
                      </div>

                      <h3><a href="blog.html">{{ user.name }}</a></h3>
                      <p>{{ user.note }}</p>
                      <a href="blog.html" class="btn-style">Подробнее</a>

                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <div class="col-md-3 col-sm-6 col-xs-12 col">
            <aside class="right-sidebar1">
              <div class="search-sidebar mb-30">
                <form action="#">
                  <input type="text" name="search" placeholder="Search Here">
                  <button type="button" name="button"><i class="fa fa-search"></i></button>
                </form>
              </div>

              <div class="category-wrap mb-30">
                <h3 class="sidebar-title">Category</h3>
                <ul>
                  <li><a href="#">Investments</a></li>
                  <li><a href="#">Budgets</a></li>
                  <li><a href="#">Accounting</a></li>
                  <li><a href="#">Portfolios</a></li>
                  <li><a href="#">Wealth</a></li>
                  <li><a href="#">Business</a></li>
                  <li><a href="#">Corporate</a></li>
                </ul>
              </div>
              <div class="related-post mb-30">

              </div>

              <div class="archive-wrap mb-30">

              </div>

              <div class="tags-wrap">
                <h3 class="sidebar-title">Post Tags</h3>
                <ul>
                  <li><a href="#">html</a></li>
                  <li><a href="#">css</a></li>
                  <li><a href="#">javascript</a></li>
                  <li><a href="#">business</a></li>
                  <li><a href="#">corporate</a></li>
                  <li><a href="#">php</a></li>
                  <li><a href="#">dolor</a></li>
                  <li><a href="#">amet</a></li>
                </ul>
              </div>

            </aside>
          </div>

        </div>
      </div>
    </section>

  </page-template>
</template>

<script>
import {mapGetters, mapActions } from "vuex";

export default {
  name: "UsersList",
  data() {
    return {
    }
  },

  computed : {

     getUsersInfo() {
         for(let key in this.getUsers) {
             let user = this.getUsers[key];
             let userId = user.user_id
             this.getUserAvatar(userId).then(avatar => {
                 this.getUsers[key].photo = avatar
             })
         }
     },

  },

  methods: {

    async getUserAvatar(userId) {
        const apiUrl = '/user/get-avatar/' + userId
        const response = await this.send(apiUrl)
        let avatar = '/assets/images/user-not-photo.jpg'
        if(response)
          avatar = response
        return avatar
    },

  },

}
</script>

<style scoped>

</style>
