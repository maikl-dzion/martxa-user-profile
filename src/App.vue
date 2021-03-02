<template>
  <div @click="customDropdownClose" >

    <NewPreloader/>

    <AlertMessage/>

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

    <transition name="fade-app">
       <router-view></router-view>
    </transition>

  </div>
</template>

<script>

import NewPreloader from '@/components/app/NewPreloader'
import AlertMessage from '@/components/app/AlertMessage'

export default {
  name: 'App',
  data() { return {
      userId: 0,
  }},

  created() {
      this.userId = this.store('user_id')
      this.setRootFilesPath()
      this.setStoreUserInfo ();
      this.fetchUsers();
  },

  methods: {
    customDropdownClose() {
      const eventName = 'dropdown-menu-close';
      this.sendEventBus (eventName, { status : false});
    }
  },

  components : { NewPreloader, AlertMessage },

  mounted() {
    this.getEventBus('auth_event', resp => {
      this.userId = resp.user_id
    })
  },

}
</script>

<style scoped>

.fade-app-enter-active, .fade-app-leave-active {
  transition: opacity 0.2s;
}
.fade-app-enter, .fade-app-leave-to  {
  opacity: 0.9;
}

/* Анимации появления и исчезновения могут иметь */
/* различные продолжительности и динамику.       */
/*.fade-appe-enter-active {*/
/*  transition: all .3s ease;*/
/*}*/
/*.fade-app-leave-active {*/
/*  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
/*}*/
/*.fade-app-enter, .fade-app-leave-to {*/
/*  transform: translateX(10px);*/
/*  opacity: 0;*/
/*}*/

</style>
