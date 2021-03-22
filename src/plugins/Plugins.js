import InfoMessage  from '@/components/app/InfoMessage'
import Preloading   from '@/components/app/Preloading'
import PageTemplate from '@/components/app/PageTemplate'
import PreViewJson  from '@/components/app/PreViewJson'
import { mapGetters, mapActions } from 'vuex'

const Plugins = {
  install (Vue) {

    Vue.component('PageTemplate', PageTemplate)
    Vue.component('InfoMessage' , InfoMessage)
    Vue.component('Preloading'  , Preloading)
    Vue.component('PreViewJson' , PreViewJson)

    Vue.mixin({

      data () { return {
          responseMessage: '',
          responseColor  : '',
          preloaderState: false,
          preloaderMessage: 'Подождите, идет сохранение',
          userId    : 0,
          userName  : '',
          rootPath  : '',
          usersList : [],
      }},

      computed : {
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
        ]),

        setTimer (fn, timer = 3000) {
            setTimeout(fn, timer)
        },

        logout() {
            this.userId = 0
            this.storeRemove('user_name')
            this.storeRemove('user_id')
            this.setToken(null)
            this.$router.push('/page/auth')
        },

        setStoreUserInfo () {

            this.userId = this.store('user_id')
            const route = this.$router.currentRoute
            if(route.name == 'user-register' || route.name == 'home')
              return true;

            if (!this.userId)
              this.$router.push('/auth')

            this.fetchUser(this.userId);
            this.userName = this.store('user_name')

        },

        getCurrentUserInfo () {
            this.userId = this.store('user_id')
            if (!this.userId) {
              this.$router.push('/auth')
            }
            this.fetchUser(this.userId);
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

        async checkUserEmail(email) {
          const apiUrl = '/get/user/' +email+ '/email';
          const response = await this.send(apiUrl);
          if(response.user_id)
             return true
          return false;
        },

        getRootFilesPath () {
            this.rootPath = this.store('root_path')
        },

        updateItemClassActive(elem, className, activeClass) {
            let list = document.querySelectorAll(className);
            for(let i in list) {
              if(!list[i].style) continue;
              let item = list[i];
              item.classList.remove(activeClass)
            }
            elem.classList.add(activeClass);
        },

        respInfoClear() {
            this.responseMessage = ''
            this.responseColor   = ''
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
