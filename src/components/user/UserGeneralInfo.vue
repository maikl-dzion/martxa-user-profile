<template>
  <div class="blog-details-content">

    <h3 class="sidebar-title" style="font-style: italic; font-size: 17px">Основная информация</h3>
    <hr/>

    <div class="faq-form form-style" style="border:0px red solid; margin-bottom:20px;">
      <form id="user-general-info" @submit.prevent=""><div class="row">

         <template v-for="(item, fname) in userModel" >

               <div class="col-xs-12"><div class="row">

                   <template v-if="fname == 'email'">

                         <div class="col-xs-4">
                           <div class="input-label">
                             <div>Email</div>
                             <div style="color:red; font-weight: bold; margin-left:10px;">*</div>
                             <div style="position: absolute; margin:-20px 0px 0px -10px">
                               <i v-if="userInfo.email_verify" class="fa fa-check-square-o" style="color:green"></i>
                             </div>
                           </div>
                         </div>

                         <div class="col-xs-6">
                           <input v-model="userInfo.email" required="true" type="text" placeholder="Email">
                         </div>

                         <div class="col-xs-2">
                           <div class="portfolio-menu text-center">
                             <button @click="emailVerify('send')" class="btn-style" style="height: 38px">Заверить</button>
                           </div>
                         </div>

                         <div v-if="emailVerifyState" class="col-xs-12">
                           <div class="row send-box" style="">
                             <div class="col-xs-4">
                               На ваш почтовый ящик отправлено письмо с кодом, <br>
                               нужно ввести этот код в поле и отправить на сервер
                             </div>
                             <div class="col-xs-4">
                               <input v-model="emailVerifyCode" required="true" type="text" placeholder="Code">
                               <button @click="emailVerify('check')"
                                       class="btn-style" style="width: 100%">Подтвердить
                               </button>
                             </div>
                           </div>
                         </div>

                   </template>
                   <template v-else-if="fname == 'phone'">

                         <div class="col-xs-12">
                           <div class="row">
                             <div class="col-xs-4">
                               <div class="input-label">Телефон</div>
                               <div style="position: absolute; margin:-43px 0px 0px -10px">
                                 <i v-if="userInfo.phone_verify"
                                    class="fa fa-check-square-o" style="color:green"></i></div>
                             </div>
                             <div class="col-xs-6">
                               <input v-model="userInfo.phone" type="text" placeholder="Телефон">
                             </div>
                             <div class="col-xs-2">
                               <div class="portfolio-menu text-center">
                                 <button @click="phoneVerify('send')" class="btn-style" style="height: 38px">Заверить</button>
                               </div>
                             </div>
                           </div>
                         </div>

                         <div v-if="phoneVerifyState" class="col-xs-12">
                           <div  class="row send-box" >
                             <div class="col-xs-4">
                               На ваш телефон отправлено sms с кодом, <br>
                               нужно ввести этот код в поле и отправить на сервер
                             </div>
                             <div class="col-xs-4">
                               <input v-model="phoneVerifyCode" required="true" type="text" placeholder="Code">
                               <button @click="phoneVerify('check')"
                                       class="btn-style" style="width: 100%">Подтвердить
                               </button>
                             </div>
                           </div>
                         </div>

                   </template>
                   <template v-else >

                         <div class="col-xs-4" >
                           <div class="input-label">
                             <div>{{item.label}}</div>
                             <div v-if="fname == 'username'"
                                  style="color:red; font-weight: bold; margin-left:10px;">*</div>
                           </div>
                         </div>

                         <div class="col-xs-8" >
                           <template v-if="item.type == 'textarea'">
                               <textarea v-model="userInfo[fname]" class="contact-textarea"
                                         :placeholder="item.label"  ></textarea>
                           </template>
                           <template v-else >
                              <input v-if="fname == 'username'"
                                     v-model="userInfo[fname]"  :type="item.type"  required="true" :placeholder="item.label">
                              <input v-else-if="fname == 'role'"
                                    v-model="userInfo[fname]"  :type="item.type" :placeholder="item.label" disabled>
                              <input v-else
                                    v-model="userInfo[fname]"  :type="item.type" :placeholder="item.label" >
                           </template>

                         </div>

                   </template>

               </div></div>

         </template>

          <!----------------------->
          <div class="col-xs-12">
            <hr/>
          </div>

          <div class="col-xs-12">
            <button @click="saveUserInfo()"
                    class="cont-submit btn-contact btn-style">Сохранить
            </button>
          </div>

      </div></form>
    </div>

<!--                        <pre>{{userInfo}}</pre>-->
<!--                        <pre>{{getUsersList}}</pre>-->

  </div> <!--- ./ blog-details-content --->
</template>

<script>


import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserGenerealInfo',
  data: () => ({
    tab: null,

    emailVerifyCode : null,
    emailVerifyState: false,

    phoneVerifyCode: '',
    phoneVerifyState: false,

    userModel : {

        // "user_id":     { type : 'text', label : 'UserId', value : '', },
        "username":    { type : 'text', label : 'Имя пользователя', value : '', },
        "email":       { type : 'email', label : 'Email', value : '', },
        // "password":    { type : 'text', label : 'Пароль', value : '', },
        "login":       { type : 'text', label : 'Логин', value : '', },
        "phone":       { type : 'text', label : 'Телефон', value : '', },
        "role":        { type : 'text', label : 'Роль', value : '', },
       // "photo":       { type : 'text', label : 'Фотография', value : '', },
        "active":      { type : 'text', label : 'Статус', value : '', },
        "age":         { type : 'text', label : 'Возраст', value : '', },
        "sex":         { type : 'text', label : 'Пол', value : '', },
        "address":     { type : 'text', label : 'Адрес', value : '', },
        "date_of_birth": { type : 'date', label : 'Дата рождения', value : '', },
        "note":        { type : 'textarea', label : 'О себе', value : '', },

        // "email_code":   { type : 'text', label : '', value : '', },
        // "phone_code":   { type : 'text', label : '', value : '', },
        // "email_verify": { type : 'text', label : '', value : '', },
        // "phone_verify": { type : 'text', label : '', value : '', },
        // "public_key":   { type : 'text', label : '', value : '', },
        // "private_key":  { type : 'text', label : '', value : '', },
        // "email_verified_at": { type : 'text', label : '', value : '', },

        "created_at":    { type : 'text', label : 'Дата создания' , value : '', },
        "updated_at":    { type : 'text', label : 'Дата изменения', value : '', },

    },

  }),


  methods: {

    ...mapActions([
        'fetchUser',
        'fetchUsers',
        'setUserId',
        'setPreloader',
        'setAlertInfo',
    ]),

    async emailVerify (type) {

      if (type == 'send')
        this.emailVerifyCode = 0

      const code = this.emailVerifyCode
      const userId = this.userInfo.user_id

      this.setPreloader(true)
      const apiUrl = '/user/email-verify/' + type + '/' + userId + '/' + code
      const response = await this.send(apiUrl)
      this.setPreloader(false)

      this.preloaderState   = false
      this.emailVerifyState = false
      this.emailVerifyCode  = ''
      let message, color = '';

      switch (type) {
          case 'send' :

              if (response) {
                this.emailVerifyState = true
                message = 'На вашу почту отправлено письмо'
              }
              break

          case 'check' :
              if (response) {
                message = `Почта подтверждена`
              } else {
                message = 'Не удалось подтвердить почту'
                color = 'red'
              }
              break
      }

      let responseInfo = { message }
      if(color) responseInfo['color'] = color
      this.setAlertInfo(responseInfo);
      this.getUserInfo()
    },

    async phoneVerify (type) {

        if (type == 'send')
          this.phoneVerifyCode = 0

        const code = this.phoneVerifyCode
        const userId = this.userInfo.user_id

        this.setPreloader(true)
        const apiUrl = '/user/phone-verify/' + type + '/' + userId + '/' + code
        let response = await this.send(apiUrl)
        this.setPreloader(false)

        this.preloaderState = false
        this.phoneVerifyState = false
        this.phoneVerifyCode = ''
        let message, color = '';
        switch (type) {
          case 'send' :
            if (response)  {
               this.phoneVerifyState = true
               message = `На ваш телефон отправлено смс`
            }
            break

          case 'check' :
            if (response) {
              message = `Телефон подтвержден`
            } else {
              message = 'Не удалось подтвердить телефон'
              color = 'red'
            }
            break
        }

        let responseInfo = { message }
        if(color) responseInfo['color'] = color
        this.setAlertInfo(responseInfo);
        this.getUserInfo()
    },

    saveUserInfo () {
      this.setPreloader(true)
      this.respInfoClear()
      const data   = this.userInfo;
      const userId = data.user_id;
      const apiUrl = '/post/user/update/' + userId
      this.send(apiUrl, 'put', data).then(this.responseUserInfoHandle)
    },

    responseUserInfoHandle (response) {
        this.setPreloader(false)
        this.getUserInfo()
        const res = this.saveResponse(response, 'Данные пользователя обновлены', 'Не удалось обновить данные пользователя ')
    },

  }

}
</script>

<style>

.user-menu ul li {
  cursor: pointer;
  line-height: 30px;
  border-bottom: 1px solid #f1f1f1;
}

.input-label {
  color: #296dc1;
  font-style: italic;
  border-bottom: 1px #296dc1 solid;
  display: flex;
}

.send-box {
  border:1px #77adef solid; margin:0px 0px 14px 0px; padding:4px;
  -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 8px 4px rgba(34, 60, 80, 0.2);
}
</style>
