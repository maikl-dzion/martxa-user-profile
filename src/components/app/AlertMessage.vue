<template>
  <div v-if="alertMessage" @click="setAlertInfo({ message : '', color : ''})"
       class="blog-details-content" style="">
       <blockquote
         :style="'margin:0px; border-radius: 0px; padding: 10px; background:' + alertColor "
         v-html="alertMessage" ><slot></slot>
      </blockquote>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "AlertMessage",
  computed : {
    ...mapGetters([
      'alertColor',
      'alertMessage',
    ]),
  },

  methods : {
    ...mapActions([
      'setAlertInfo',
    ]),

  }
}
</script>

<style scoped>
   .blog-details-content {
     width:30%;
     border: 0px gainsboro solid;
     padding:4px;
     cursor:pointer;
     position: fixed;
     z-index: 9999;
     top:5%;
     right:0px;
   }
</style>
