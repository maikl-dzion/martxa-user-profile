<template>
  <div>
    <HeaderPanel/>

    <div class="container"  style="border:0px red solid; margin-bottom: 30px; padding:2px; ">
       <div style="height: 10px; background: none"></div>
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
