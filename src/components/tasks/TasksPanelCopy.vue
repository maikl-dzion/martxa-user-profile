<template><div>

<!--  <pre>{{task_items}}</pre>-->
<!--   <pre>{{getStatusList}}</pre>-->

  <table class="task-items-table" >

      <tr>
        <th><div class="task-panel__caption" style="border-bottom:orange 2px solid;" >Назначено</div></th>
        <th><div class="task-panel__caption" style="border-bottom:darkblue 2px solid;" >В работе</div></th>
        <th><div class="task-panel__caption" style="border-bottom:red 2px solid;" >На проверке</div></th>
        <th><div class="task-panel__caption" style="border-bottom:green 2px solid;" >Выполнено</div></th>
      </tr>

      <tr>
        <th><div class="task-panel__list"

             @dragenter="dragEnter"
             @dragleave="dragLeave"

             @drop="dragDrop($event)"
             @dragover.prevent="cancel"
             data-status-name="progress"
             data-status-id=0 >

              <template v-for="(item) in getStatusList.start" >
                <div class="task__card js-card" draggable="true"
                     :id="'task-' + item.task_id"
                     :data-task-id="item.task_id"
                     @dragstart="dragStart($event)"
                     @dragend="dragEnd($event)" >

                     <TaskItemInfo :task="item" />

                </div>
              </template>

        </div></th>
        <th><div class="task-panel__list"

             @dragenter="dragEnter"
             @dragleave="dragLeave"
             @drop="dragDrop($event)"
             @dragover.prevent="cancel"
             data-status-name="progress"
             data-status-id=1 >

            <template v-for="(item) in getStatusList.progress" >
              <div class="task__card js-card" draggable="true"
                   :id="'task-' + item.task_id"
                   :data-task-id="item.task_id"
                   @dragstart="dragStart($event)"
                   @dragend="dragEnd($event)" >

                   <TaskItemInfo :task="item" />

              </div>
            </template>

        </div></th>
        <th><div class="task-panel__list"

             @dragenter="dragEnter"
             @dragleave="dragLeave"
             @drop="dragDrop($event)"
             @dragover.prevent="cancel"
             data-status-name="progress"
             data-status-id=2 >

            <template v-for="(item) in getStatusList.checked" >
              <div class="task__card js-card" draggable="true"
                   :id="'task-' + item.task_id"
                   :data-task-id="item.task_id"
                   @dragstart="dragStart($event)"
                   @dragend="dragEnd($event)" >

                   <TaskItemInfo :task="item" />
              </div>
            </template>

        </div></th>
        <th><div class="task-panel__list"

             @dragenter="dragEnter"
             @dragleave="dragLeave"
             @drop="dragDrop($event)"
             @dragover.prevent="cancel"
             data-status-name="progress"
             data-status-id=3 >

            <template v-for="(item) in getStatusList.done" >
              <div class="task__card js-card" draggable="true"
                   :id="'task-' + item.task_id"
                   :data-task-id="item.task_id"
                   @dragstart="dragStart($event)"
                   @dragend="dragEnd($event)" >

                   <TaskItemInfo :task="item" />
              </div>
            </template>

        </div></th>

      </tr>

  </table>

</div></template>

<script>

import TaskItemInfo   from '@/components/tasks/TaskItemInfo';

export default {
  name: "TasksPanel",
  props : ['task_items'],

  data() {
    return {
        selectTaskId : 0,
        dragItem : {},
        dropItem : {},

        statusList : {
            'start' : [],
            'progress' : [],
            'checked' : [],
            'done' : [],
        },
    }
  },

  computed : {

      getTaskItems () {
         return this.task_items;
      },

      getStatusList() {
        return this.getStatusRender ()
      }
  },

  components : {
    TaskItemInfo
  },

  methods : {

      taskStatusesClear(){
          let list = {
              'start' : [],
              'progress' : [],
              'checked' : [],
              'done' : [],
          };
          this.statusList = list;
      },

      getStatusRender () {
          this.taskStatusesClear();
          const tasks = this.task_items
          for(let i in tasks) {
              let task  = tasks[i];
              let fname = 'start';
              switch (task.task_status) {
                  case 1 : fname = 'progress'; break;
                  case 2 : fname = 'checked'; break;
                  case 3 : fname = 'done'; break;
                  // default : break;
              }
              this.statusList[fname].push(task);
          }
          return this.statusList;
      },


      dragStart(event) {

           this.dragItem = {};
           this.selectTaskId = 0;
           this.selectTaskId = event.target.dataset.taskId;
           this.dragItem = event.target;

            setTimeout(() => {
               event.target.classList.add('hide');
            }, 0);

           console.log('drag-start', this.selectTaskId);
      },

      dragDrop(event) {
          let elem = event.target;
          const statusName = event.target.dataset.statusName;
          const statusId = parseInt(event.target.dataset.statusId);
          this.changeTaskStatus(statusId);
          // event.target.append(this.dragItem);

          elem.classList.remove('hovered');
          elem.classList.remove('_padding-top');
          console.log('drop', statusName, statusId);
      },

      dragEnd(event) {
          const taskId = event.target.dataset.taskId;
          console.log('end', taskId);
      },

      dragEnter(event) {
         // this.dropItem = {};
         event.preventDefault();
         let elem = event.target;
         elem.classList.add('hovered');
         elem.classList.add('_padding-top');

         // this.dropItem = event.target;
         // this.dropItem.preventDefault();
         // this.dropItem.classList.add('hovered');
         // elem.classList.add('_padding-top');
      },

      dragLeave(event) {

          let elem = event.target;
          elem.classList.remove('hovered');
          elem.classList.remove('_padding-top');

          //this.dropItem.classList.remove('hovered');
          // event.target = elem;
          console.log('dragLeave', elem);
      },

      changeTaskStatus(statusId) {
          for(let i in this.getTaskItems){
              let task = this.getTaskItems[i];
              if(task.task_id != this.selectTaskId)
                continue
              this.getTaskItems[i].task_status = statusId;
              this.updateItem(this.getTaskItems[i])
              this.getStatusRender ();
              return true;
          }
          return false;
      },

      // Изменить задачу
      async updateItem(data, callback = null) {
          const itemId = data.task_id
          const url = '/save/task-board/' + itemId;
          const response = await this.send(url, 'put', data);
          // this.saveResponse(response, 'Успешное сохранение', 'Не удалось сохранить')
          if(callback)
            callback(response);
          return response;
      },

      cancel() {
        // console.log("Cancel hit");
      },
  },

}

// const dragAndDrop = () => {
//       const cards  = document.querySelectorAll('.js-card');
//       const cells  = document.querySelectorAll('.js-cell');
//       const dragStart = function (e) {
//         console.log(e);
//         setTimeout(() => {
//           this.classList.add('hide');
//         }, 0);
//       };
//       const dragEnd = function () {
//         this.classList.remove('hide');
//       };
//       const dragOver = function (evt) {
//         evt.preventDefault();
//       };
//       const dragEnter = function (evt) {
//         evt.preventDefault();
//         this.classList.add('hovered');
//       };
//       const dragLeave = function () {
//         this.classList.remove('hovered');
//       };
//       const dragDrop = function () {
//         this.append(card);
//         this.classList.remove('hovered');
//       };
//       cells.forEach(cell => {
//         cell.addEventListener('dragover', dragOver);
//         cell.addEventListener('dragenter', dragEnter);
//         cell.addEventListener('dragleave', dragLeave);
//         cell.addEventListener('drop', dragDrop);
//       });
//       cards.forEach(cell => {
//         cell.addEventListener('dragstart', dragStart);
//         cell.addEventListener('dragend'  , dragEnd);
//       });
// };


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
    box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.2);
    background-color:#f0f2f5;
    padding:5px !important;
    /*padding-top:35px !important;*/
}

.task-panel__caption {
    width: 100%;
    font-weight: bold;
    color: #0747a6;
    border-bottom:grey 1px solid;
}

/******************************/
/******** Task Item ***********/

.task__card {

    border: 1px #b0c5de solid;
    background: white;
    margin-bottom: 10px;
    padding:1px;
    font-size: 12px;
    font-weight: normal;
    box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.2);
    cursor: all-scroll;

}

.task__card-header {
    font-style: italic;
    border: #b0c5de 0px solid;
    background-color: #0747a6;
    color:white;
    font-weight: bold;
    font-size: 13px;
    min-height: 32px;

}

.task__card-info {
    margin:4px;
    padding:3px;
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
