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

          userId: '',
          userName: ''
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
        }

      } // --- Methods
    }) // --- Mixin

  }
}

export default Plugins
