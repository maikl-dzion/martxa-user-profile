<template>
<div v-if="getMessage"
    class="blog-details-content" style="max-width:30%;">
    <blockquote
      :style="'text-align:center; border-radius: 0px; padding: 6px 6px 6px 12px; background:' + getColor">
          <div v-html="getMessage" ></div>
          <slot></slot>
      </blockquote>
</div>
</template>

<script>
export default {
  name: "InfoMessage",
  props: ['message', 'color'],
  computed : {
     getMessage() {
        return this.message
     },

     getColor() {
        return this.color
     }
  }

}
</script>

<style scoped>

</style>
