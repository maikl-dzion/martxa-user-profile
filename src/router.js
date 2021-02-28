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
      path: '/page/auth',
      name : 'auth',
      component: () => import('./pages/Auth')
    },

    {
      path : '/page/users-list',
      component: () => import('./pages/UsersList')
    },

    {
      path: '/page/register',
      name : 'user-register',
      component: () => import('./pages/UserRegister')
    },

    {
      path: '/page/bulletin-board',
      component: () => import('./pages/BulletinBoardList')
    },

    {
      path: '/page/bulletin-board/item/:item_id',
      component: () => import('./pages/BulletinBoardItem')
    },

    {
      path: '/page/task-board',
      component: () => import('./pages/TaskBoard')
    },

    {
      path: '/page/profile',
      component: () => import('./pages/UserProfile')
    },

    {
      path: '/page/admin-panel',
      component: () => import('./pages/AdminPanel')
    },

    {
      path: '/page/tests',
      component: () => import('./pages/TestsPanel')
    },
  ]
})
