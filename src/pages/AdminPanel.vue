<template>
  <page-template>
    AdminPanel

    <UserList></UserList>
  </page-template>
</template>

<script>

import UserList from '@/components/admin/UserList'

export default {
  name: "AdminPanel",
  data() {
    return {

    }
  },

  created: function () {
     this.getCurrentUserInfo()
  },

  components : {
    UserList
  }


}
</script>

<style scoped>

</style>
