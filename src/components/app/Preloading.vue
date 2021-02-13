<template>
<div>
  <!-- preloder-wrap -->
      <div v-if="getPreloader" id="cssLoader3" class="preloder-wrap" style="opacity: 0.9">

          <div class="loader">
              {{getMessage}}
              <slot></slot>
              <div class="child-common child4"></div>
              <div class="child-common child3"></div>
              <div class="child-common child2"></div>
              <div class="child-common child1"></div>
          </div>

      </div>
  <!-- preloder-wrap -->
</div>
</template>

<script>
export default {
  name: "Preloading",
  props : ['preloader', 'message'],
  computed : {
      getPreloader() {
         return this.preloader
      },

      getMessage() {
        return this.message
      }
  },
}
</script>

<style scoped>

</style>
