<template>
<div>
  <div v-if="getMessage" class="blog-details-content" style="max-width:30%;">
    <blockquote
      :style="'border-radius: 0px; padding: 6px; background:' + getColor " >
        {{getMessage}}
        <slot></slot>
      </blockquote>
  </div>
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
