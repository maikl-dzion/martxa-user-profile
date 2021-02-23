<template>
<div class="blog-details-content" style="">

     <button @click="updateStatus"
             class="btn-contact btn-style "
             style="border:1px #b0c5de solid; width:80px; padding:2px; margin:3px;"
     >{{getTitle}}</button>

     <pre v-if="showFlag" style="border-radius: 0px">{{items}}</pre>
</div>
</template>

<script>
export default {
  name: "PreViewJson",
  props: ['items', 'title'],
  data() {
    return {
       showFlag : false,
    }
  },

  computed : {
     getTitle() {
        if(this.title)
          return this.title
        else
          return 'json';
     }
  },


  methods : {
     updateStatus() {
       this.showFlag = (this.showFlag) ? false : true;
     }
  }
}
</script>

<style scoped>
</style>
