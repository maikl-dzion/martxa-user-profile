<template>
  <page-template>

    <!-- blog-details-area start -->
    <section class="blog-details-area1 ptb-101" style="border:0px red solid; ">

      <div style="border:0px red solid;">

<!--        <pre>{{curTrainInfo}}</pre>-->

        <h3 class="sidebar-title" style="background: #296dc1; padding: 15px; color:white;">Меню поездов</h3>

        <div class="row" style="background: #296dc1; padding: 0px; margin: 0px;">

          <!--- ЛЕВАЯ ПАНЕЛЬ ---->
          <div class="col-md-4 col-sm-6 col-xs-12" style="border:0px orange solid; padding:4px 10px 10px 10px" >
            <aside class="left-sidebar" style="padding: 0px" >

              <div class="mb-20 about-wrap user-menu user-profile-menu">
                <h5 class="sidebar-title" style="text-align: left; color:white;
                                                 font-style: italic; font-size: 18px;
                                                 margin:10px 0px 10px 0px; padding:0px"> Список поездов </h5>
                <ul>
                  <template v-for="(item, key) in trainList" >
                     <li :key="key" @click="selectedItem($event, item)" class="train-card">
                         <div> № поезда : {{item.number}}</div>
                         <div> Откуда  : {{item.from}}</div>
                         <div> Куда : {{item.to}}</div>
                         <div> Название : {{item.name}}</div>
                     </li>
                  </template>
                </ul>
              </div>

            </aside>
          </div>

          <!--- ПРАВАЯ ПАНЕЛЬ ---->
          <div class="col-md-8 col-sm-6 col-xs-12"
               style="background: white; border: 1px #296dc1 solid; height: 100%" >
              <div class="blog-details-wrap" style="padding-top:20px;" >

                    <div v-if="errorState" >
                        <h3 style="color:red; text-align: center" >Не удалось получить информацию о маршруте поезда <br/> (попробуйте выполнить запрос позднее)</h3>
                        <pre >{{trainInfoError}}</pre>
                    </div>
                    <div v-else class="">

                      <!-- featured-area start -->
                      <div class="featured-area" style="position: relative; width: 100%; margin-bottom: 20px">
                        <div class="container1">
                          <div class="row">
                            <div class="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12 wow fadeInUp">
                              <div class="section-title text-center">
                                <h3 > Маршрут поезда</h3>
                                <div v-if="selectTrain.number"> № : {{selectTrain.number}} </div>
                                <div v-if="selectTrain.name"> {{selectTrain.name}} </div>
                                <div v-if="trainInfo.from"> Откуда : {{ trainInfo.from}} </div>
                                <div v-if="trainInfo.to"> Куда   : {{trainInfo.to}}      </div>
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-xs-12">
                              <div class="featured-wrap">
                                <ul v-if="trainRoutes.length">

                                  <li v-for="(item) in trainRoutes"
                                      class="wow fadeInRight" data-wow-delay=".1s">
                                        <h3>{{item.stop}} <span> {{item.departure_time}} </span></h3>
                                        <div class="featured-content">
                                            <div class="featured-info" style="width: 100%">
                                              <h4>{{item.stop}}</h4>
                                              <p>Время отправления : {{item.departure_time}}</p>
                                              <p>Время прибытия : {{item.arrivel_time}}</p>
                                            </div>
                                        </div>
                                  </li>

                                  <li><h3>end</h3></li>

                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- featured-area end -->

                    </div>
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

    trainList    : [],
    soapInfo     : {},
    curTrainInfo : {},
    selectTrain  : {},
    trainInfo    : {},
    trainRoutes   : [],

    trainInfoError : {},
    errorState : false,

    serviceAuth : {
        'login'        : 'test',
        'psw'          : 'bYKoDO2it',
        'terminal'     : 'htk_test',
        'represent_id' : 22400,
    },

    travelInfo : {
        'from'   : 'Санкт-Петербург',
        'to'     : 'Москва',
        'day'    : 9,
        'month'  : 5,
    },

  }),

  components: {
    UserInfoEditForm,
    MultiFilesUploader,
    UserAvatar,
    MediaManager
  },

  created () {
      this.getCurrentUserInfo();
      this.getRootFilesPath();
      this.fetchUsers();
      this.getTrainList();
      this.getSoapInfo();
  },

  mounted () {
    // this.getUserFiles()
  },

  computed: {

  },

  methods: {

    ...mapActions([
      'fetchUser',
      'fetchUsers',
      'setUserId',
      'setPreloader',
      'setAlertInfo',
    ]),

    async getTrainList() {

        this.setPreloader(true)
        const apiUrl = '/train-service/train-list'
        const trainList = await this.send(apiUrl);
        this.setPreloader(false)

        this.trainList = trainList.train_list;
        this.curTrainInfo = {
            info_date : trainList.info_date,
            from : trainList.from,
            to : trainList.to,
        }
    },

    async getTrainInfo(train) {

      this.errorState = false;
      this.setPreloader(true)
      const apiUrl = '/train-service/train-route/' + train.number
      const trainInfo = await this.send(apiUrl);
      this.setPreloader(false)

      if('error' in trainInfo) {
         this.trainInfoError = trainInfo['error'];
         this.errorState = true;
         return false;
      }

      this.trainInfo = trainInfo.train_description;
      this.trainRoutes = trainInfo.route_list.stop_list;
    },


    async getSoapInfo() {
      const apiUrl = '/train-service/soap-info'
      const resp = await this.send(apiUrl);
      this.soapInfo = resp
    },


    selectedItem(event, item){
      // const activeClass = 'user-menu-active';
      // let aMenuList = document.querySelectorAll('.user-profile-menu li a');
      // this.htmlElemsRender(aMenuList, (elem) => {
      //   if(elem && elem.classList)
      //     elem.classList.remove(activeClass)
      // });
      // const target = event.target;
      // target.classList.add(activeClass);
      this.selectTrain = item;
      this.getTrainInfo(item);
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


li.train-card {
   border: 1px gainsboro solid;
   padding: 15px !important;
   margin-bottom: 4px;
}

li.train-card div {
   color:white;
}

</style>
