<template>
  <div>

    <table class="task-items-table">
      <tr>
        <th>
          <div class="task-panel__caption" style="border-bottom:orange 2px solid;">Назначено</div>
        </th>
        <th>
          <div class="task-panel__caption" style="border-bottom:darkblue 2px solid;">В работе</div>
        </th>
        <th>
          <div class="task-panel__caption" style="border-bottom:red 2px solid;">На проверке</div>
        </th>
        <th>
          <div class="task-panel__caption" style="border-bottom:green 2px solid;">Выполнено</div>
        </th>
      </tr>
      <tr>

        <template v-for="(stateName, key) in taskStateList">
          <th :key="stateName">
            <div class="task-panel__list"
                 @dragenter="dragEnter"
                 @dragleave="dragLeave"
                 @drop="dragDrop($event)"
                 @dragover="dragOver($event)"
                 :data-status-name="stateName"
                 :data-status-id="key">

              <!----- task list ------>
              <template v-for="(item) in taskList">
                <div v-if="item.task_status == key"
                     class="task__card js-card"
                     draggable="true"
                     :id="'task-' + item.task_id"
                     :data-task-id="item.task_id"
                     @dragstart="dragStart($event)"
                     @dragend="dragEnd($event)">
                     <TaskItemInfo :task="item"/>
                </div>
              </template>
              <!----- task list ------>

            </div>
          </th>
        </template>

      </tr>
    </table>

    <pre>{{taskList}}</pre>

  </div>
</template>

<script>

import TaskItemInfo from '@/components/tasks/TaskItemInfo';

export default {

  name: "TasksPanel",
  props: ['task_items'],

  data() {

    return {

      selectTaskId: 0,
      dragItem: {},
      dropItem: {},
      tasks   : [],
      dropZoneClass : 'task-panel__list',

      // statusList: {
      //   'start': [],
      //   'progress': [],
      //   'checked': [],
      //   'done': [],
      // },

      taskStateList: {
        0: 'start',
        1: 'progress',
        2: 'checked',
        3: 'done',
      },
    }
  },

  computed: {

    taskList() {
      this.tasks = this.task_items;

      for (let i in this.tasks)
        if(!this.tasks[i].task_status)
          this.tasks[i].task_status = 0;

      return this.tasks;
    },

    // getStatusList() {
    //   return this.getStatusRender ()
    // }
  },

  components: {
    TaskItemInfo
  },

  methods: {

    taskStatusesClear() {
      let list = {
        'start': [],
        'progress': [],
        'checked': [],
        'done': [],
      };
      this.statusList = list;
    },

    getStatusRender() {
      this.taskStatusesClear();
      const tasks = this.task_items
      for (let i in tasks) {
        let task = tasks[i];
        let fname = 'start';
        switch (task.task_status) {
          case 1 :
            fname = 'progress';
            break;
          case 2 :
            fname = 'checked';
            break;
          case 3 :
            fname = 'done';
            break;
          // default : break;
        }
        this.statusList[fname].push(task);
      }
      return this.statusList;
    },

    changeTaskStatus(statusId) {
      let tasks = this.taskList;
      for (let i in tasks) {
          if (tasks[i].task_id != this.selectTaskId)
            continue;

          let task = tasks[i];
          tasks[i].task_status = statusId;
          this.updateItem(task)
          // this.getStatusRender();
          return true;
      }
      return false;
    },

    // Обновить задачу
    async updateItem(data, callback = null) {
        const itemId = data.task_id
        const url = '/save/task-board/' + itemId;
        const response = await this.send(url, 'put', data);
        // this.saveResponse(response, 'Успешное сохранение', 'Не удалось сохранить')
        if (callback)
          callback(response);
        return response;
    },

    checkDropZoneClass(elem) {
      const dropZoneClass = this.dropZoneClass;
      if(elem.classList.contains(dropZoneClass))
        return elem;

      let parent = elem.parentElement;
      return this.checkDropZoneClass(parent);
    },

    ///////////////////////////////////////
    ///////// DragItem ////////////////////

    // срабатывает в момент начала перетаскивания элемента
    dragStart(event) {

      this.dragItem     = {};
      this.selectTaskId = 0;
      this.selectTaskId = event.target.dataset.taskId;
      this.dragItem     = event.target;

      setTimeout(() => {
        event.target.classList.add('hide');
      }, 0);
    },

    dragEnd(event) {
      const taskId = event.target.dataset.taskId;
    },


    ///////////////////////////////////////
    ///////// DragZone ////////////////////

    // Бросаем елемент над dropzone
    dragDrop(event) {
      let elem = this.checkDropZoneClass(event.target);
      // const statusName = elem.dataset.statusName;
      const statusId = parseInt(elem.dataset.statusId);
      this.changeTaskStatus(statusId);
      elem.classList.remove('hovered');
    },


    // Заходим в dropzone
    dragEnter(event) {
      let elem = this.checkDropZoneClass(event.target);
      elem.classList.add('hovered');
    },

    // Покидаем  dropzone
    dragLeave(event) {
      let elem = event.target;
      elem.classList.remove('hovered');
    },

    // Передвигаемся над  dropzone
    dragOver(event) {
      event.preventDefault();
      let elem = event.target;
    },

  },

}

</script>

<style scoped>

.task-items-table {
  width: 100%;
  border-collapse: collapse; /* Убираем двойные линии между ячейками */
}

.task-items-table td, .task-items-table th {
  width: 25%;
  text-align: center;
  vertical-align: top;
  padding: 5px; /* Поля вокруг содержимого таблицы */
  border: 0px solid gainsboro; /* Параметры рамки */
}

/******************************/
/**** Task Items Panel *******/

.task-panel__list {
  width: 100%;
  min-height: 250px;
  list-style: none;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
  background-color: #f0f2f5;
  padding: 5px !important;
  /*padding-top:35px !important;*/
}

.task-panel__caption {
  width: 100%;
  font-weight: bold;
  color: #0747a6;
  border-bottom: grey 1px solid;
}

/******************************/
/******** Task Item ***********/

.task__card {

  border: 1px #b0c5de solid;
  background: white;
  margin-bottom: 10px;
  padding: 1px;
  font-size: 12px;
  font-weight: normal;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
  cursor: all-scroll;

}

.task__card-header {
  font-style: italic;
  border: #b0c5de 0px solid;
  background-color: #0747a6;
  color: white;
  font-weight: bold;
  font-size: 13px;
  min-height: 32px;

}

.task__card-info {
  margin: 4px;
  padding: 3px;
  border: gray 0px solid;
  background-color: #eff5ff;
}


._padding-top {
  padding-top: 100px !important;
}

.hovered {
  background-color: #d1d8e2;
}

.hide {
  display: none;
}


</style>
