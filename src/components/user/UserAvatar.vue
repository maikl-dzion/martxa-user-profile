<template>
<div>

  <div class="author-wrap" style="border:1px gainsboro solid; padding:4px" >
    <div class="author-img" style="border-bottom:1px gainsboro solid">
        <img  :src="avatar" alt="" style="border-radius: 0px; width:100%;">
    </div>

    <SingleFileUploader
      type="avatar"
      :uid="user_id"
      @file_load="fileLoaded"
      style="margin: 0px 0px 10px 0px"
    ></SingleFileUploader>

    <div class="author-info" >
      <h4 style="text-align: center">{{ user.username }} [{{ user.login }}]</h4>
      <div v-if="user.created_at" style="font-size: 11px; text-align: center" >
        Дата регистрации: <br>{{ user.created_at }}
      </div>
    </div>
  </div>

</div>
</template>

<script>

import SingleFileUploader from "@/components/SingleFileUploader"

export default {
  name: "UserAvatar",
  props: ['user', 'user_id'],
  data() {
     const assetsUrl = this.assetsUrl;
     return {
        avatar : assetsUrl + '/images/user-not-photo.jpg',
     }
  },

  created() {
     this.getUserAvatar()
  },

  methods : {

    fileLoaded(response) {
        if(response.save_result)
          this.getUserAvatar()
    },

    async getUserAvatar(userId = null) {
        if(!userId) userId = this.user_id
        const apiUrl = '/user/get-avatar/' + userId
        const response = await this.send(apiUrl)
        if(response)
           this.avatar = response
    },

  },

  components: {SingleFileUploader},
}
</script>

<style scoped>

</style>
