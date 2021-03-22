<template>
  <div>

    <Navbar/>

    <section v-if="showTopPanel" class="b-breadcrumbs" >
      <div class="container">
        <slot name="page-title"></slot>
      </div>
    </section>

    <div class="container">
      <div style="height: 40px; background: none"></div>
      <slot></slot>
    </div>

<!--    <Footer/>-->

  </div>
</template>

<script>

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  name: 'BaseLayout',
  props : ['top_panel'],
  computed : {
     showTopPanel() {
         let panel = (this.top_panel) ? true : false;
         return panel;
     }
  },
  components: {
    Navbar, Footer
  }
}
</script>

<style scoped>

</style>
