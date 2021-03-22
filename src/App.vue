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

    <!--- Анимированные button (примеры) --->
    <!--    <div class="span-shadow">-->
    <!--        <button class="btn-hover-effect square-out"  >ЭФФЕКТ 1</button>-->
    <!--        <button class="btn-hover-effect shadow-live" >ЭФФЕКТ 2</button>-->
    <!--        <button class="btn-hover-effect square-in"   >ЭФФЕКТ 3</button>-->
    <!--        <button class="btn-hover-effect square-list" >ЭФФЕКТ 4</button>-->
    <!--    </div>-->

    <!--    <p class="span-shadow">-->
    <!--      <span class="btn-hover-effect square-out"  >ЭФФЕКТ 1</span>-->
    <!--      <span class="btn-hover-effect shadow-live" >ЭФФЕКТ 2</span>-->
    <!--      <span class="btn-hover-effect square-in"   >ЭФФЕКТ 3</span>-->
    <!--      <span class="btn-hover-effect square-list" >ЭФФЕКТ 44</span>-->
    <!--    </p>-->

    </div>
</template>

  <script>

  import NewPreloader from '@/components/app/NewPreloader'
  import AlertMessage from '@/components/app/AlertMessage'

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


  <style>

  * {
    box-sizing: border-box;
    font-size: 12px;
  }

  button {
     cursor: pointer;
  }

  input {
    cursor: pointer;
  }

  /***** КНОПКИ  *****/

  .span-shadow {text-align:center}
  .span-shadow .btn-hover-effect {
    display: inline-block;
    margin: 5px;
    padding: 7px 15px;
    cursor: pointer;
    border-radius: 0px;
    transition: .2s linear;
    color: white;
    background:#337ab7;
  }

  .span-shadow .square-out {background:#3A2F28}
  .span-shadow .square-out:hover {
    box-shadow: 0 0 0 2px white, 0 0 0 4px #3A2F28;
  }

  .span-shadow .shadow-live {background:#C1F1E4}
  .span-shadow .shadow-live:hover {
    box-shadow: 200px 0 0 0 rgba(0,0,0,.3) inset;
  }

  .span-shadow .square-in {background:#D2973D}
  .span-shadow .square-in:hover {
    box-shadow: 0 0 0 2px #D2973D inset, 0 0 0 4px white inset;
  }

  .span-shadow .square-list {
    background: #C76637;
    position: relative;
    top: 0;
    left: 0;
  }
  .span-shadow .square-list:hover {
    box-shadow: 2px 2px white, 4px 4px #C76637;
    top: -4px;
    left: -4px;
  }
  /****  .КНОПКИ  *****/

  .span-shadow .square-in:hover {
    box-shadow: 0 0 0 2px #1946BA inset, 0 0 0 4px white inset;
  }


  </style>
