// import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
// import PageTemplate from '@/components/app/PageTemplate'
// import InfoMessage  from '@/components/app/InfoMessage'
// import Preloading   from '@/components/app/Preloading'
import PreViewJson from '@/components/app/PreViewJson'

const Plugins = {

  install (Vue) {

    // Vue.component('PageTemplate', PageTemplate)
    // Vue.component('InfoMessage' , InfoMessage)
    // Vue.component('Preloading'  , Preloading)
    Vue.component('PreViewJson', PreViewJson)

    Vue.mixin({

      data () {
        return {
          responseMessage: '',
          responseColor: '',
          preloaderState: false,
          preloaderMessage: 'Подождите, идет сохранение',
          userId: 0,
          userName: '',
          rootPath: '',
          usersList: [],
          formErrorBox: 'form-input-error-box',
        }
      },

      computed: {
        ...mapGetters([
          'userInfo',
          'getUsers',
          'getUserId'
        ]),
      },

      methods: {

        ...mapActions([
          'fetchUser',
          'fetchUsers',
          'setUserId',
          'setPreloader',
          'setAlertInfo',
          'clearUserInfo',
          'setUserInfo',
        ]),

        setTimer (fn, timer = 3000) {
          setTimeout(fn, timer)
        },

        logout () {
            this.userId   = 0
            this.userInfo = {}
            this.storeRemove('user_name')
            this.storeRemove('user_id')
            this.setToken(null)
            this.clearUserInfo();
            this.$router.push('/auth')
        },

        setUserInfoInit(response) {
          const user = response.user;
          const token = response.token;
          const userId = user.user_id

          this.setUserId(userId)
          this.setUserInfo(user)
          this.fetchUsers()

          this.setToken(token)
          this.store('user_name', user.username)
          this.store('user_id'  , userId)
          this.sendEventBus('auth-user-access-ok', { user_id : userId })
        },

        setStoreUserInfo () {
          this.userId = this.store('user_id')
          const route = this.$router.currentRoute
          if (route.name == 'user-register' || route.name == 'home') {
            return true
          }

          if (!this.userId) {
            this.$router.push({ name: 'auth' })
          }

          this.fetchUser(this.userId)
          this.userName = this.store('user_name')
        },

        getCurrentUserInfo () {
          this.userId = this.store('user_id')
          if (!this.userId) {
            this.$router.push('/page/auth')
          }
          this.fetchUser(this.userId)
          this.userName = this.store('user_name')
        },

        getUserInfo () {
          const userId = this.userId
          const apiUrl = '/get/user/' + userId + '/user_id'
          this.send(apiUrl).then(response => {
            this.userInfo = response
          })
        },

        getUsersList () {
          const apiUrl = '/get/users'
          this.send(apiUrl).then(response => {
            this.usersList = response
          })
        },

        setRootFilesPath () {
          const apiUrl = '/root/files/path'
          this.send(apiUrl).then(response => {
            this.store('root_path', response.root_path)
          })
        },

        async checkUserEmail (email) {
          const apiUrl = '/get/user/' + email + '/email'
          const response = await this.send(apiUrl)
          if (response.user_id) {
            return true
          }
          return false
        },

        getRootFilesPath () {
          this.rootPath = this.store('root_path')
        },

        updateItemClassActive (elem, className, activeClass) {
          let list = document.querySelectorAll(className)
          for (let i in list) {
            if (!list[i].style) continue
            let item = list[i]
            item.classList.remove(activeClass)
          }
          elem.classList.add(activeClass)
        },

        respInfoClear () {
          this.responseMessage = ''
          this.responseColor = ''
        },

        showDataValidError (target, message = '') {
          const color = (message) ? 'red' : 'black'
          target.style.color = color
          const errorBoxName = this.formErrorBox
          this.saveErrorMessage(target, message, errorBoxName)
        },

        saveErrorMessage (target, message, errorBoxName) {
          let children = target.parentNode.childNodes
          this.htmlElemsRender(children, elem => {
            if (elem && elem.classList) {
              const state = elem.classList.contains(errorBoxName)
              if (state) {
                elem.innerHTML = message
                return -1
              }
            }
          })
        },

        setInputValue (model, resp) {
          const name = resp.name
          const value = resp.value
          this[model][name] = value
        },

        htmlElemsRender (elems, fn = null) {
          let results = []
          for (let i in elems) {
            let elem = elems[i]
            if (fn) {
              let res = fn(elem)
              if (res == -1) return true
              results.push(res)
            }
          }
          return results
        },

      } // --- Methods
    }) // --- Mixin

  }
}

export default Plugins
