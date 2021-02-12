import InfoMessage from '../components/app/InfoMessage'
import Preloader from '../components/app/Preloader'
import PageTemplate from '../components/app/PageTemplate'

const Plugins = {
  install (Vue) {

    Vue.component('PageTemplate', PageTemplate)
    Vue.component('InfoMessage', InfoMessage)
    Vue.component('Preloader', Preloader)

    Vue.mixin({
      data () {
        return {
          responseMessage: '',
          responseColor: '',

          preloader: false,
          preloaderMessage: 'Подождите, идет сохранение',

          userId: 0,
          userName: '',

          userInfo: {},
          usersList : [],

          rootPath : '',
        }
      },
      methods: {

        setTimer (fn, timer = 3000) {
          setTimeout(fn, timer)
        },

        getCurrentUserInfo () {
          this.userId = this.store('user_id')
          if (!this.userId) {
            this.$router.push('/page/auth')
          }
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

        getRootFilesPath () {
            this.rootPath = this.store('root_path')
        },

        respInfoClear() {
            this.responseMessage = ''
            this.responseColor   = ''
        },

      } // --- Methods
    }) // --- Mixin

  }
}

export default Plugins
