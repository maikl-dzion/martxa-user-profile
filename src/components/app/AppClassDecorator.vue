
<template>
  <h1 @click="onClick">
    {{message}}
  </h1>
</template>

<script>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
export default Component({})(
  class App extends Vue {
    @Prop({default: 'Batman'})
    message;
    onClick() {
      this.message = 'Bruce Wayne';
    }
  }
);
</script>


<!--<template>-->
<!--  <h1 @click="onClick">-->
<!--    {{message}}-->
<!--  </h1>-->
<!--</template>-->

<!--<script>-->
<!--import Vue from 'vue';-->
<!--import Component from 'vue-class-component';-->
<!--export default Component({})(-->
<!--  class App extends Vue {-->
<!--    message = 'Batman';-->
<!--    onClick() {-->
<!--      this.message = 'Bruce Wayne';-->
<!--    }-->
<!--  }-->
<!--);-->
<!--</script>-->

<style scoped>

</style>
