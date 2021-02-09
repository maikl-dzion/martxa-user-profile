import InfoMessage from '../components/app/InfoMessage'
import Preloader from '../components/app/Preloader'
import PageTemplate from '../components/app/PageTemplate'

const Plugins = {
  install(Vue) {

    Vue.component('PageTemplate', PageTemplate)
    Vue.component('InfoMessage', InfoMessage)
    Vue.component('Preloader', Preloader)

    Vue.mixin({
      data() {
        return {
          responseMessage: '',
          responseColor: '',
          preloader: false,
          preloaderMessage: 'Подождите, идет сохранение',
        }
      },
      methods: {

        setTimer(fn, timer = 3000) {
          setTimeout(fn, timer)
        },

      } // --- Methods
    }) // --- Mixin

  }
}

export default Plugins
