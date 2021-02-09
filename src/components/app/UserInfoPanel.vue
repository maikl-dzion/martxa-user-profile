<template>
  <div>
    <i class="fa fa-user"></i> {{userName}} </li>
  </div>
</template>

<script>
export default {
  name: "UserInfoPanel",

  // data() {return {}},

  created: function () {
      this.getCurrentUserInfo()
  },

}
</script>

<style scoped>

</style>
