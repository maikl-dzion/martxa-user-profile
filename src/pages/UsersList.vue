<template>
  <page-template>

    <!-- blog-details-area start -->
    <section class="blog-details-area1 ptb-101" style="border:0px red solid; ">

      <div style="border:0px red solid;">

        <h3 class="sidebar-title" style="background: #296dc1; padding: 15px; color:white;">Список пользователей</h3>

        <div class="row" style="background: #296dc1; padding: 0px; margin: 0px;">

<!--          <pre>{{getUsers}}</pre>-->

          <!--- ЛЕВАЯ ПАНЕЛЬ ---->
          <div class="col-md-6 col-sm-6 col-xs-12" style="border:0px orange solid; padding:4px 10px 10px 10px" >
            <aside class="left-sidebar" style="padding: 0px" >

              <div class="mb-20 about-wrap user-menu user-profile-menu">
                <ul><li v-for="(user) in getUsers" :key="user.user_id" >

                    <div style="display: flex; margin-top: 20px;">
                        <img :src="user.avatar" style="width:70px; margin-right: 2px;">
                        <div @click="selectedUser($event, user)" class="user-list-card" style="width:100%; border: 1px white solid" >
                            <div>{{user.username}}</div>
                            <div>{{user.role_name}}</div>
                        </div>
                    </div>

                </li></ul>
              </div>

            </aside>
          </div>
          <!--- ПРАВАЯ ПАНЕЛЬ ---->
          <div class="col-md-6 col-sm-6 col-xs-12"
               style="background: white; border: 1px #296dc1 solid; height: 100%" >
              <div class="blog-details-wrap" style="padding-top:20px;" >

                <template v-if="tab == 'users_list'">
                  <UserInfoEditForm :user="selectUser"/>
                </template>

              </div>
          </div>

        </div>
      </div>
    </section>
    <!-- blog-details-area end -->

  </page-template>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

import UserInfoEditForm from '@/components/admin/UserInfoEditForm'
import UserAvatar from '@/components/user/UserAvatar'
import MultiFilesUploader from '@/components/MultiFilesUploader'
import MediaManager from '@/components/app/MediaManager'

export default {

  data: () => ({
    tab: 'users_list',
    emailVerifyCode: null,
    emailVerifyState: false,
    phoneVerifyState: false,
    newPassword: {
      password: '',
      repeat_pwd: ''
    },
    userFiles : [],
    usersList : [],
    fileAlbums: {},
    selectUser : {},
  }),

  components: {
    UserInfoEditForm,
    MultiFilesUploader,
    UserAvatar,
    MediaManager
  },

  created () {
    this.getCurrentUserInfo()
    this.getRootFilesPath()
    this.fetchUsers()
  },

  mounted () {
    this.getUserFiles()
    // this.loadingUsersAvatar();
  },


  methods: {

    ...mapActions([
        'fetchUser',
        'fetchUsers',
        'setUserId',
        'setPreloader',
        'setAlertInfo',
    ]),

    filesLoaded (response) {
      this.getUserFiles()
      this.saveResponse(response, 'Файлы успешно загружены', 'Не удалось загрузить файлы')
    },

    deleteFile (fileId) {
      this.setPreloader(true)
      const apiUrl = '/delete/file/' + fileId
      this.send(apiUrl, 'delete').then(response => {
        this.getUserFiles()
        this.saveResponse(response, 'Файл удален', 'Файл не получилось удалить')
      })
    },

    compareNewPassword () {
      if (this.newPassword.password != this.newPassword.repeat_pwd) {
        return 'Пароли не совпадают'
      }
      return ''
    },

    changePassword () {
      if (!this.changePasswordValidate()) return false
      const data = this.newPassword
      const apiUrl = '/post/user/change-password/' + this.userId
      this.setPreloader(true)
      this.send(apiUrl, 'put', data).then(response => {
        this.saveResponse(response, 'Пароль успешно изменен', 'Не удалось изменить пароль')
      })
    },

    changePasswordValidate () {
      if (!this.newPassword.password) {
        return false
      }
      let message = this.compareNewPassword()
      if (message) {
        this.responseMessage = message
        this.responseColor = 'red'
        return false
      }
      this.respInfoClear()
      return true
    },

    responseStatusHandle (response, successMessage = null, errorMessage = null, fn = null) {
      const res = this.saveResponse(response, successMessage, errorMessage)
      if (fn) fn(res)
      return true
    },

    getUserFiles () {
      const apiUrl = '/user/get-files/' + this.userId
      this.send(apiUrl).then(response => {
        this.userFiles = response
        this.getFileAlbums(this.userFiles)
      })
    },

    getFileAlbums (files) {
      for (let i in files) {
        const file = files[i]
        if (file.folder_name) {
          this.fileAlbums[file.folder_name] = file.folder_name
        }
      }
    },

    selectedUser(event, user){
      const activeClass = 'user-menu-active';
      let aMenuList = document.querySelectorAll('.user-profile-menu li div');
      this.htmlElemsRender(aMenuList, (elem) => {
        if(elem && elem.classList)
          elem.classList.remove(activeClass)
      });
      let target = event.target;
      const cl = target.classList.contains('user-list-card')
      if(!cl) {
        target = event.target.parentNode;
      }
      target.classList.add(activeClass);
      this.selectUser = user;
    },

    async getUserAvatar(userId) {
        const apiUrl = '/user/get-avatar/' + userId
        const avatar = await this.send(apiUrl)
        let avatarUrl = (avatar) ? avatar : '/assets/images/user-not-avatar.jpg';
        return avatarUrl
    },

    async loadingUsersAvatar() {

        for(let key in this.getUsers) {
            let user = this.getUsers[key];
            const avatar = await  this.getUserAvatar(user.user_id)
            this.getUsers[key]['avatar'] = avatar
        }
    },

  }

}
</script>

<style>


.input-label {
  color: #296dc1;
  font-style: italic;
  border-bottom: 1px #296dc1 solid;
  display: flex;
}

.user-profile-menu li {
  border: 0px red solid;
  padding: 0px !important;
  list-style: none;
}


.user-profile-menu li a {
  font-size: 13px;
  font-weight: bold;
  color:white;
  cursor: pointer;
  display: block;
  text-decoration: none;
  padding:10px;
  width: 100%;
}

.user-profile-menu li a:hover {
  /*border-bottom: 1px red solid;*/
  color: orange;
}

.user-menu-active {
  background: white;
  color: black !important;
}

.about-wrap ul li:before {
  display: none;
  content: "";
}

.user-list-card  {
   padding:5px;
}

.user-list-card div {
   color:orange;
}

</style>


