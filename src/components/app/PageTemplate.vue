<template>
  <div>

    <!-- heared area start -->
    <HeaderPanel/>
    <!-- heared area end -->

    <div class="container" >
       <div style="height: 20px; background: none"></div>
       <slot></slot>
    </div>

    <!-- footer-area start  -->
    <Footer/>
    <!-- footer-area end  -->

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
