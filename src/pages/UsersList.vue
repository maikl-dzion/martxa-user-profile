<template><page-template >
<section class="blog-details-area1 ptb-101" style="border:0px red solid; ">
  <div style="border:0px red solid;">
      <h3 class="sidebar-title" style="background: #296dc1; padding: 15px; color:white;">Список пользователей</h3>
      <div class="row" style="background: #296dc1; padding: 0px; margin: 0px;">

            <!--- ЛЕВАЯ ПАНЕЛЬ ---->
            <div class="col-md-6 col-sm-6 col-xs-12" style="border:0px orange solid; padding:4px" >
              <aside class="left-sidebar" style="padding: 0px" >

<!--                <div class="mb-20 about-wrap user-menu user-profile-menu">-->
<!--                  <ul><li v-for="(user) in getUsers" :key="user.user_id" >-->
<!--  -->
<!--                      <div style="display: flex; margin-top: 20px;">-->
<!--                          <img :src="user.avatar" style="width:70px; margin-right: 2px;">-->
<!--                          <div @click="selectedUser($event, user)" class="user-list-card" style="width:100%; border: 1px white solid" >-->
<!--                              <div>{{user.username}}</div>-->
<!--                              <div>{{user.role_name}}</div>-->
<!--                          </div>-->
<!--                      </div>-->
<!--  -->
<!--                  </li></ul>-->
<!--                </div>-->

                <section  v-for="(user) in getUsers" :key="user.user_id"
                          class="section section-about wow fadeInUp wt-sky-reading-list-page"
                          style="visibility: visible; animation-name: fadeInUp; padding:3px; margin-bottom: 10px;" >
                          <div @click="selectedUser($event, user)" class="profile" style="cursor: pointer"><div class="row">

                              <div class="col-sm-4">
                                <div class="photo-profile">
                                    <img :src="user.avatar" >
                                </div>

<!--                                <a href="https://rstill.netlify.app/cv/cv-1.pdf" target="cv">-->
<!--                                  <div class="download-resume">-->
<!--                                    <i class="fa fa-cloud-download" aria-hidden="true"></i>-->
<!--                                    <span class="text-download">DOWNLOAD RESUME</span>-->
<!--                                  </div>-->
<!--                                </a>-->
<!--                                -->
<!--                                <div class="available">-->
<!--&lt;!&ndash;                                  <i class="fa fa-check" aria-hidden="true"></i>&ndash;&gt;-->
<!--                                  <span class="text-available">{{user.role_name}}</span>-->
<!--                                </div>-->

                              </div>

                              <div class="col-sm-8">
                                <div class="info-profile">

                                  <h4><span></span> {{user.username}} </h4>
                                  <h6><span>Роль : </span> {{user.role_name}} </h6>
<!--                                  <h6>web developer &amp; web designer</h6>-->
                                  <div class="row">

                                    <div class="col-sm-6">
                                      <ul class="ul-info">
                                        <li class="li-info">
                                          <span class="title-info">Дата рождения : </span>
                                          <span class="info">{{user.date_of_birth}}</span>
                                        </li>
                                        <li class="li-info">
                                          <span class="title-info">Адрес : </span>
                                          <span class="info">{{user.address}}</span>
                                        </li>
                                        <li class="li-info">
                                          <span class="title-info">Email : </span>
                                          <span class="info">{{user.email}}</span>
                                        </li>
                                      </ul>
                                    </div>

                                    <div class="col-sm-6">
                                      <ul class="ul-info">
                                        <li class="li-info">
                                          <span class="title-info">Телефон : </span>
                                          <span class="info">{{user.phone}}</span>
                                        </li>
                                        <li class="li-info">
                                          <span class="title-info">Website : </span>
                                          <span class="info"></span>
                                        </li>
                                        <li class="li-info">
                                          <span class="title-info"> Национальность : </span>
                                          <span class="info"></span>
                                        </li>
                                      </ul>
                                    </div>

                                  </div>

                                  <hr/>
                                  <p> Короткое описание о себе : </p>
                                  <p>  {{user.note}} </p>

                                </div>
                              </div>

                          </div></div><!-- .profile .row -->
                </section>

              </aside>
            </div>

            <!--- ПРАВАЯ ПАНЕЛЬ ---->
            <div class="col-md-6 col-sm-6 col-xs-12"
                 style="background: white; border: 1px #296dc1 solid; height: 100%" >
                <div class="blog-details-wrap" style="padding-top:20px;" >

                  <template v-if="tab == 'users_list'">
                     <pre>{{selectUser}}</pre>
<!--                     <UserInfoEditForm :user="selectUser"/>-->
                  </template>

                </div>
            </div>

      </div><!-- .row -->
  </div>
</section>
</page-template></template>

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
        // const activeClass = 'user-menu-active';
        // let aMenuList = document.querySelectorAll('.user-profile-menu li div');
        // this.htmlElemsRender(aMenuList, (elem) => {
        //   if(elem && elem.classList)
        //     elem.classList.remove(activeClass)
        // });
        // let target = event.target;
        // const cl = target.classList.contains('user-list-card')
        // if(!cl) {
        //   target = event.target.parentNode;
        // }
        // target.classList.add(activeClass);
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


