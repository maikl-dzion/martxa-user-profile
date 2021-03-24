import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    {
      path: '/',
      name : 'home',
      component: Home
    },

    {
      path: '/auth',
      name : 'auth',
      component: () => import('./pages/Auth')
    },

    {
      path: '/user-register',
      name : 'user-register',
      component: () => import('./pages/UserRegister')
    },

    {
      path: '/user-profile',
      name : 'user-profile',
      component: () => import('./pages/UserProfile')
    },

    {
      path : '/users-list',
      component: () => import('./pages/UsersList')
    },

    {
      path: '/train-service',
      name : 'train-service',
      component: () => import('./pages/TrainService')
    },


    {
      path: '/bulletin-board',
      component: () => import('./pages/BulletinBoardList')
    },

    {
      path: '/bulletin-board/item/:item_id',
      component: () => import('./pages/BulletinBoardItem')
    },

    {
      path: '/task-board',
      component: () => import('./pages/TaskBoard')
    },


    {
      path: '/admin-panel',
      component: () => import('./pages/AdminPanel')
    },

    {
      path: '/tests',
      component: () => import('./pages/TestsPanel')
    },
  ]
})
