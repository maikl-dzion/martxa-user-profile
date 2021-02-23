<template>
  <div>
    <HeaderPanel/>

    <div class="container" >
       <div style="height: 40px; background: none"></div>
       <slot></slot>
    </div>

    <Footer/>
  </div>
</template>

<script>

import HeaderPanel from '../../components/app/HeaderPanel'
import Footer from '../../components/app/Footer'

export default {
  name: 'PageTemplate',
  components: {
    HeaderPanel, Footer
  }
}
</script>

<style scoped>

</style>
