<template>
  <page-template>
    <section class="blog-details-area ptb-101" style="">

      <div class="container">
        <div class="row">

          <!--- ЛЕВАЯ ПАНЕЛЬ ---->
          <!--        <div class="col-md-3 col-sm-6 col-xs-12" style="border:0px red solid ">-->
          <!--            <aside class="left-sidebar">-->
          <!--              <div class="mb-20 about-wrap user-menu">-->
          <!--                <h3 class="sidebar-title" style="font-size: 18px; font-weight: bold">Проекты</h3>-->
          <!--                <ul>-->
          <!--                    <li v-for="(item) in projectList"-->
          <!--                        @click="getProjectItems($event, item)"-->
          <!--                        class="menu-category-item" >-->
          <!--                          <a v-if="!item.items_count">{{ item.name }} ({{item.items_count}})</a>-->
          <!--                          <a v-else >{{ item.name }}-->
          <!--                                     <span style="color:green; font-weight: bold"> [ {{item.items_count}} ]</span></a>-->
          <!--                    </li>-->
          <!--                </ul>-->
          <!--              </div>-->
          <!--            </aside>-->
          <!--        </div>-->

          <div class="col-md-12 col-xs-12">
            <div class="blog-details-wrap">

              <p class="span-shadow" style="border: 0px red solid; width: 220px; padding:0px; margin-bottom:10px;">
                   <span @click="addFormState = !addFormState" class="btn-hover-effect square-list"
                         style="width: 100%; margin:0px; background:#337ab7; border: 0px red solid;">
                         Добавить задачу</span>
              </p>

              <TaskItemForm
                v-if="addFormState"
                :users_list="getUsers"
                :project_list="projectList"
                @save_response="saveResponseHandle"/>

              <div v-if="addFormState" style="box-shadow: 0 20px 0 #3C93D5; height: 5px; margin:0px 0px 20px 0px"></div>

              <!--            <AppClassDecorator/>-->

            </div>
          </div><!--- /col-md-9 col-xs-12 --->

          <div class="col-md-12 col-xs-12" style="margin: 10px 0px 10px 0px">
            <div class="tags-wrap">
              <h3 class="sidebar-title" style="font-size: 18px; font-weight: bold">Проекты</h3>
              <ul>
                <li v-for="(item) in projectList"
                    @click="getProjectItems($event, item)"
                    class="menu-category-item" style="cursor: pointer;">
                  <a v-if="!item.items_count">{{ item.name }} ({{ item.items_count }})</a>
                  <a v-else>{{ item.name }}
                    <span style="color:green; font-weight: bold"> [ {{ item.items_count }} ]</span></a>
                </li>
              </ul>
            </div>
          </div>

          <!--- ПАНЕЛЬ ЗАДАЧ---->
          <div class="col-md-12 col-sm-12 col-xs-12" style="border:0px red solid ">
            <div class="blog-details-wrap">

              <h3 class="sidebar-title" style="font-size: 18px; font-weight: bold"> Задачи </h3>
              <h5 v-if="currentProjectName" class="sidebar-title"
                  style="font-size: 15px;">Проект : {{ currentProjectName }} ({{ taskItems.length }})</h5>
              <hr/>

              <TasksPanel
                :task_items="taskItems"
                :project_id="currentProjectId"/>

            </div>
          </div>
          <!--- ./ ПАНЕЛЬ ЗАДАЧ---->

        </div>
      </div>
    </section>
  </page-template>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

import FilesLoaderPreview from '@/components/FilesLoaderPreview'
import TaskItemForm from '@/components/tasks/TaskItemForm';
import TasksPanel from '@/components/tasks/TasksPanel'
import AppClassDecorator from '@/components/app/AppClassDecorator'

export default {
  name: "BulletinBoard",
  data: () => ({

    saveType: 'add',
    currentProjectName: '',
    currentProjectId: 0,
    addFormState: false,
    allItemsCount: 0,

    itemModel: {
      name: '',
      project_id: 0,
      to_user_id: 0,
      task_status: 0,
      user_id: 0,
      short_desc: '',
      description: '',
      final_date: '',
    },

    projectList: [],
    taskItems: [],
    taskFiles: [],
  }),

  /////////////////
  components: {
    FilesLoaderPreview,
    TaskItemForm,
    TasksPanel,
    AppClassDecorator
  },

  /////////////////
  created() {
    this.getRootFilesPath();
    this.getProjectMenu();
    // this.getTaskItems();
  },

  ////////////////
  methods: {

    // Получить меню проектов
    getProjectMenu() {
      const url = '/task-board/project-menu';
      this.send(url).then(response => {
        this.setPreloader(false)
        this.projectList = response;
        for (let i in this.projectList) {
          const project = this.projectList[i];
          this.getProjectItems({}, project);
          return true;
        }
      })
    },

    getProjectItems(event = null, item = null) {
      const projectId = this.setProjectParam(item);
      this.getTaskItems(projectId);

      if (event && event.target && event.target.parentElement) {
        const elem = event.target.parentElement;
        const className = '.menu-category-item';
        const activeClass = 'menu-active';
        this.updateItemClassActive(elem, className, activeClass);
      }
    },

    setProjectParam(item = null) {
      let projectId = 0;
      this.currentProjectName = 'Все задачи';
      if (item && item.project_id) {
        this.currentProjectId = projectId = item.project_id;
        this.currentProjectName = item.name;
      }
      return projectId;
    },

    saveResponseHandle(response) {
      this.getProjectMenu();
      const res = this.saveResponse(response, 'Успешное сохранение', 'Не удалось сохранить')
    },

    // Получить задачи
    getTaskItems(projectId = 0) {
      this.taskItems = [];
      const url = '/task-board/list/' + projectId;
      this.send(url).then(response => {
        this.setPreloader(false)
        this.taskItems = response;
        this.allItemsCount = (!projectId) ? this.taskItems.length : 0;
      })
    },

    // // Получить 1 объявление
    // getItem(itemId) {
    //   this.preloaderState = true
    //   const url = '/bulletin-board/' + itemId;
    //   this.send(url).then(response => {
    //     this.saveType = 'edit';
    //     this.itemModel = response;
    //   })
    // },
    //
    // // Удалить объявление
    // deleteItem(itemId) {
    //   const url = '/save/bulletin-board/' + itemId
    //   this.send(url, 'delete').then(response => {
    //     this.getBoardItems();
    //     this.getMenuCategories();
    //     if(response) alert('Обявление удалено');
    //     else         alert('Не получилось удалить, попробуйте еще раз');
    //   })
    // },
    //


  },  // --- Methods


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

.megamenu-dropdown {
  position: absolute;
  right: 0;
  z-index: 9999;
  transition: all .3s;
  -webkit-transition: all .3s;
  -moz-transition: all .3s;
  width: 590px;
  box-shadow: 0px 2px 3px rgb(0 0 0 15%);
  padding: 10px;
  background: #fff;
  border-top: 2px solid #296dc1;
  text-align: left;
  padding: 0px;
}

.megamenu__li-item {
  width: 192px;
  border: 1px gainsboro solid;
  margin: 2px;
  padding: 0px;
  height: 28px;
  float: left;
}

.megamenu__li__a {
  font-size: 10px;
  height: 100%;
  padding: 0px !important;
  text-align: center;
  text-transform: none;
  font-weight: 0;
}

.menu-category-item {
  border-bottom: 1px gainsboro solid;
}

.menu-active a {
  border-bottom: 1px #296dc1 solid !important;
  color: #296dc1 !important;
}


.span-shadow {
  text-align: center
}

.span-shadow .btn-hover-effect {
  display: inline-block;
  margin: 5px;
  padding: 7px 15px;
  cursor: pointer;
  border-radius: 0px;
  transition: .2s linear;
  color: white;
  background: #337ab7;
}

.span-shadow .square-out {
  background: #3A2F28
}

.span-shadow .square-out:hover {
  box-shadow: 0 0 0 2px white, 0 0 0 4px #3A2F28;
}

.span-shadow .shadow-live {
  background: #C1F1E4
}

.span-shadow .shadow-live:hover {
  box-shadow: 200px 0 0 0 rgba(0, 0, 0, .3) inset;
}

.span-shadow .square-in {
  background: #D2973D
}

.span-shadow .square-in:hover {
  box-shadow: 0 0 0 2px #D2973D inset, 0 0 0 4px white inset;
}

.span-shadow .square-list {
  background: #C76637;
  position: relative;
  top: 0;
  left: 0;
}

.span-shadow .square-list:hover {
  box-shadow: 2px 2px white, 4px 4px #C76637;
  top: -4px;
  left: -4px;
}


* {
  box-sizing: border-box;
}

.product-inner {
  width: 300px;
  margin: 0 auto;
  background: white;
  text-align: center;
  border-bottom: 2px solid #ebebec;
  transition: .2s linear;
}

.product-inner:hover {
  border-color: #bca480;
}

.product-wrap {
  position: relative;
  overflow: hidden;
  margin-bottom: 15px;
}

.product-wrap img {
  display: block;
  width: 100%;
}

.actions {
  position: absolute;
  left: 0;
  bottom: -20%;
  width: 100%;
  background: rgba(59, 62, 67, 0.75);
  transition: .3s linear;
}

.product-inner:hover .actions {
  bottom: 0;
}

.actions a {
  text-decoration: none;
  float: left;
  width: 33.33333333333333%;
  color: white;
  padding: 15px 0;
  transition: .2s linear;
}

.actions a:hover {
  background: rgba(59, 62, 67, 0.85);
}

.actions a:before {
  font-family: "FontAwesome";
}

.add-to-cart:before {
  content: "\f07a";
}

.quickview:before {
  content: "\f002";
}

.wishlist:before {
  content: "\f08a";
}

.product-info {
  padding-bottom: 10px;
  font-family: 'Noto Sans', sans-serif;
}

.product-title {
  margin: 0 0 10px 0;
  font-family: 'Noto Sans', sans-serif;
}

.product-title a {
  text-decoration: none;
  color: #1e1e1e;
  font-weight: 400;
  font-size: 16px;
}

.price {
  font-weight: bold;
  color: #bca480;
}


/*.my-shadow {*/
/*  box-shadow: inset 2px 2px 5px rgba(154, 147, 140, 0.5), 1px 1px 5px rgba(255, 255, 255, 1);*/
/*  box-shadow: 0 2px 0 #3C93D5;*/
/*  box-shadow: 2px 2px white, 4px 4px;*/
/*}*/


</style>
