<template>
  <div v-if="alertMessage" @click="setAlertInfo({ message : '', color : '', json : null})"
       class="blog-details-content" >

    <blockquote
      :style="'background:' + alertColor "
      v-html="alertMessage" >
      <slot></slot>
    </blockquote>

    <!--       <pre v-if="alertJson"-->
    <!--            style="margin:10px auto 10px auto; width:100%; text-align:left;padding:10px"-->
    <!--            >{{alertJson}}</pre>-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "AlertMessageWrapp",
  computed : {
    ...mapGetters([
      'alertColor',
      'alertMessage',
      'alertJson'
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
  width:100%;
  border: 0px gainsboro solid;
  padding:8px;
  cursor:pointer;
  position: fixed;
  z-index: 9999;
  right:0px;
  text-align: center;
}

blockquote {
  width:35%; margin:0px auto 0px auto; border-radius: 0px; padding: 10px; color:black; font-size:19px;
  border: 2px green solid;
  /*border-left: 0px blue solid;*/
}
</style>











<!--<template>-->
<!--  <div v-if="alertMessage" @click="setAlertInfo({ message : '', color : '', json : null})"-->
<!--       class="blog-details-content" style="">-->

<!--       <blockquote-->
<!--         :style="'margin:0px; border-radius: 0px; padding: 10px; background:' + alertColor "-->
<!--         v-html="alertMessage" >-->
<!--         <slot></slot>-->
<!--       </blockquote>-->

<!--       <pre v-if="alertJson"-->
<!--            style="margin:10px auto 10px auto; width:100%; text-align:left;padding:10px"-->
<!--            >{{alertJson}}</pre>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { mapGetters, mapActions } from 'vuex'-->
<!--export default {-->
<!--  name: "AlertMessage",-->
<!--  computed : {-->
<!--    ...mapGetters([-->
<!--      'alertColor',-->
<!--      'alertMessage',-->
<!--      'alertJson'-->
<!--    ]),-->
<!--  },-->

<!--  methods : {-->
<!--    ...mapActions([-->
<!--      'setAlertInfo',-->
<!--    ]),-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--   .blog-details-content {-->
<!--     width:100%;-->
<!--     border: 0px gainsboro solid;-->
<!--     padding:8px;-->
<!--     cursor:pointer;-->
<!--     position: fixed;-->
<!--     z-index: 9999;-->
<!--     bottom:2%;-->
<!--     right:0px;-->
<!--     text-align: center;-->
<!--   }-->
<!--</style>-->



