<template>
  <div>

    <HeaderTop/>

    <section class="b-breadcrumbs" >
      <div class="container">
         <slot name="page-title"></slot>
      </div>
    </section>

    <div class="container">
      <div style="height: 0px; background: none"></div>
      <slot></slot>
    </div>

  </div>
</template>

<script>

import HeaderTop from '@/components/HeaderTop'

export default {
  name: 'RegisterLayout',
  components: {
    HeaderTop
  }
}
</script>

<style scoped>

</style>
