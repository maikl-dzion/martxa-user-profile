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

      <tr> <template v-for="(tasks, stateKey) in tasksStatusList">

          <th :key="stateKey">
              <div class="task-panel__list"
                   @dragenter="dragEnter"
                   @dragleave="dragLeave"
                   @drop="dragDrop($event)"
                   @dragover="dragOver($event)"
                   :data-status-id="stateKey">

                   <!----- task list ------>
                   <template v-for="(item) in tasks" >
                        <div class="task__card js-card"
                             draggable="true"  :key="item.task_id"
                             :id="'task-' + item.task_id"
                             :data-task-id="item.task_id"
                             @dragstart="dragStart($event)"
                             @dragend="dragEnd($event)">

                             <TaskItemInfo :task="item" @delete_task="deleteTask"/>

                        </div>
                    </template>
                    <!----- task list ------>
              </div><!--- ./task-panel__list --->
          </th>

      </template></tr>

    </table>

  </div>
</template>

<script>

import TaskItemInfo from '@/components/tasks/TaskItemInfo';

export default {

  name: "TasksPanel",
  props: ['task_items', 'project_id'],

  data() {

    return {

      selectTaskId: 0,
      dragItem: {},
      dropItem: {},
      tasks   : [],
      dropZoneClass : 'task-panel__list',

      tasksStateList: {
        0: [],
        1: [],
        2: [],
        3: [],
      },
    }
  },

  computed: {

    tasksStatusList() {
        this.tasks = this.task_items;
        return this.tasksStatusRender (this.tasks)
    },

  },

  components: {
    TaskItemInfo
  },

  methods: {

    statusesClear() {
        this.tasksStateList = {
            0: [], 1: [], 2: [], 3: [],
        };
    },

    tasksStatusRender(tasks) {
        this.statusesClear();
        for (let i in tasks) {
            let task  = tasks[i];
            const status = (task.task_status) ? task.task_status : 0;
            this.tasksStateList[status].push(task);
        }
        return this.tasksStateList;
    },

    changeTaskStatus(statusId) {
        let tasks = this.tasks;
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

    async deleteTask(taskId) {
      const url = '/save/task-board/' + taskId;
      const response = await this.send(url, 'delete');
      for (let i in this.tasks) {
         if(this.tasks[i].task_id == taskId) {
             delete this.tasks[i];
             return true;
         }
      }
    },

    checkDropZoneClass(elem) {
      const dropZoneClass = this.dropZoneClass;
      if(elem.classList.contains(dropZoneClass))
        return elem;
      else  {
        let parent = elem.parentElement;
        return this.checkDropZoneClass(parent);
      }
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
      console.log(elem);
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
