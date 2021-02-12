<template>
  <div>

    <!-- preloder-wrap -->
<!--      <div id="cssLoader3" class="preloder-wrap">-->
<!--          <div class="loader">-->
<!--              <div class="child-common child4"></div>-->
<!--              <div class="child-common child3"></div>-->
<!--              <div class="child-common child2"></div>-->
<!--              <div class="child-common child1"></div>-->
<!--          </div>-->
<!--      </div>-->
    <!-- preloder-wrap -->

    <!-- search-area -->
    <div class="search-area">
      <span class="closs-btn">Close</span>
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-md-offset-3">
            <div class="search-form">
              <form action="#">
                <input type="text" name="search" placeholder="Search Here">
                <button type="button" name="button" class="btn-style">Search</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- search-area -->

    <router-view></router-view>

  </div>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      userId: 0,
    }
  },

  created() {
    this.userId = this.store('user_id')
    this.setRootFilesPath()
  },

  methods: {

    logout() {
      this.userId = 0
      this.storeRemove('user_name')
      this.storeRemove('user_id')
      this.setToken(null)
      this.$router.push('/page/auth')
    }

  },

  mounted() {
    this.getEventBus('auth_event', resp => {
      this.userId = resp.user_id
    })
  }
}
</script>

<style>


</style>
