<template>
  <div>
    <page-template>
           UserProfile
    </page-template>

<!--    <v-container style="margin:0px !important;">-->
<!--      <template v-if="userId">-->


<!--        <v-card>-->

<!--          <v-toolbar dense>-->
<!--            <v-toolbar-title style="font-size: 14px">Форма редактирования</v-toolbar-title>-->
<!--            <v-spacer></v-spacer>-->
<!--            <div style="font-style: italic; color: #3949ab">{{ userName }} (user_id-{{ userId }})</div>-->
<!--          </v-toolbar>-->

<!--          <div v-if="linkItem.link_id"-->
<!--               style="margin:4px 4px 0px 8px; padding:5px; font-style: italic; color: #3949ab">-->
<!--               ID ссылки - {{linkItem.link_id}}-->
<!--          </div>-->

<!--          <v-form ref="form" class="pa-4 pt-6" style="margin-top:-15px">-->

<!--            <v-text-field-->
<!--              v-model="linkItem.link"-->
<!--              color="primary"-->
<!--              label="Ссылка"-->
<!--              type="text"-->
<!--              style="margin:0px"-->
<!--            ></v-text-field>-->

<!--            <v-text-field-->
<!--              v-model="linkItem.code"-->
<!--              color="primary"-->
<!--              label="Короткая ссылка"-->
<!--              style="min-height: 96px"-->
<!--              type="text"-->
<!--              disabled-->
<!--            ></v-text-field>-->

<!--            <v-btn style="border-radius:0px; width:200px"-->
<!--                   @click="save()"-->
<!--                   class="white&#45;&#45;text"-->
<!--                   color="indigo darken-1"-->
<!--            >Сохранить</v-btn>-->

<!--            <v-btn style="margin-left:60px; width:100px; border-radius: 0px"-->
<!--                   @click="reset()"-->
<!--                   class="white&#45;&#45;text"-->
<!--                   color="indigo darken-1"-->
<!--            >Очистить-->
<!--            </v-btn>-->

<!--          </v-form>-->
<!--        </v-card>-->

<!--        <div style="margin:4px 0px 0px 0px; padding:0px; border:0px red solid">-->

<!--          <v-toolbar dense>-->
<!--            <v-toolbar-title style="font-size: 14px">Список ссылок</v-toolbar-title>-->
<!--            <v-spacer></v-spacer>-->
<!--            <v-btn icon>-->
<!--              <v-icon>mdi-magnify</v-icon>-->
<!--            </v-btn>-->
<!--          </v-toolbar>-->

<!--          <dl class="holiday" style="cursor: pointer">-->
<!--            <template v-for="item in userLinkItems">-->
<!--              <dt @click="selectLink(item)">{{ item.link }}</dt>-->
<!--              <dd><a :href="'http://' + item.code" target="_blank" style="text-decoration: none">{{ item.code }}</a>-->
<!--              </dd>-->
<!--              <cc @click="deletelink(item.link_id)"> X</cc>-->
<!--            </template>-->
<!--          </dl>-->

<!--        </div>-->

<!--      </template>-->
<!--    </v-container>-->

  </div>
</template>

<script>
export default {

  data: () => ({
    tab: null,
    userId: 0,
    selectLinkId: 0,
    userName: null,
    saveType: 'add',

    linkItem: {
      link: '',
      code: '',
      user_id: 0
    },

    userLinkItems: []
  }),

  created: function () {
    this.userId = this.store('user_id')
    if (!this.userId)
      this.$router.push('/page/auth')

    this.userName = this.store('user_name')
    this.linkItem.user_id = this.userId
    this.getLinksByUserId()
  },

  methods: {

    reset() {
      let linkItem = {link: '', code: '', user_id: 0}
      this.linkItem = Object.assign({}, linkItem)
    },

    save() {
      switch (this.saveType) {
        case 'add' :
          this.addlink()
          break

        case 'update' :
          this.updatelink()
          break
      }
    },

    selectLink(item) {
      this.linkItem = Object.assign({}, item)
      this.saveType = 'update'
      this.selectLinkId = item.link_id
    },

    addlink() {
      const apiUrl = '/post/add/link'
      this.send(apiUrl, 'post', this.linkItem).then(this.saveResponseHandle)
    },

    updatelink() {
      const apiUrl = '/post/update/link/' + this.selectLinkId
      this.send(apiUrl, 'put', this.linkItem).then(this.saveResponseHandle)
    },

    deletelink(linkId) {
      const apiUrl = '/post/delete/link/' + linkId
      this.send(apiUrl, 'delete', this.linkItem).then(this.saveResponseHandle)
    },

    getLinksByUserId() {
      if (!this.userId) return false
      const apiUrl = '/get/links/' + this.userId
      this.send(apiUrl).then(response => {
        this.userLinkItems = response.result
      })
    },

    saveResponseHandle(response) {

      const resp = this.saveResponse(response)
      if (resp.status) {
        alert('Успешное изменение')
      } else {
        alert('Не удалось изменить -' + resp.error)
      }
      this.afterSaveActions()
    },

    afterSaveActions() {
      this.saveType = 'add'
      this.selectLinkId = 0;
      this.linkItem = Object.assign({}, {link: '', code: '', user_id: 0})
      this.getLinksByUserId()
    },

  }

}
</script>

<style>

</style>
