<template><div>

   <pre>{{stories}}</pre>

  <drag-drop
    :dropzones="dropGroups"
    :dropzonesTitle="'XYZ Company Teams'"
    :originalData="stories"
    :originalTitle="'Tasks to be distributed'"
    :inPlace="true"
    :enableSave="true"
    :enableCancel="true"
    @dropInOriginalBucket="originalBucketDropEvent"
    @dropInDestinationBucket="destinationBucketDropEvent"
    @save="save"
    @cancel="cancel">

      <template #dd-card="{ cardData }">
        <custom-task :data="cardData" @done="doneMarked"/>
      </template>

  </drag-drop>



  <div class="hero">
    <div class="wrapper">
      <ul class="list">

        <li class="list__caption">Planned</li>
        <li class="list__caption">In dev</li>
        <li class="list__caption">QA</li>
        <li class="list__caption">Production</li>

        <li class="list__cell js-cell">

          <div v-for="(i) in [1, 2, 3]"
               class="list__card js-card" draggable="true" :style="'margin-bottom:' + (i + 20)">
               <div class="list__card-header">task {{i+1}}</div>
               <div class="list__card-info">Task description</div>
          </div>

        </li>

        <li class="list__cell js-cell"></li>
        <li class="list__cell js-cell"></li>
        <li class="list__cell js-cell"></li>

      </ul>
    </div>
  </div>


  <pre>{{taskItems}}</pre>

</div></template>

<script>

import DragDrop from 'vue-drag-n-drop'
import CustomTask from '@/components/tasks/CustomTask'

export default {
  name: "TasksPanel",
  props : ['task_items'],

  data() {
    return {
      stories: [
          {
            title: 'Strategy 101',
            description: 'Create a draft of business plan',
            time: '3 days',
            done: false,
            id : 1,
          },
          {
            title: 'Strategy 102',
            description: 'Finalize the plan',
            time: '4 days',
            done: false,
            id : 2,
          },
          {
            title: 'Tech diagram',
            description: 'Draw the tech data',
            time: '4 days',
            done: false,
            id : 3,
          },
          {
            title: 'Place Holder',
            description: 'Data Science Team',
            time: '5 days',
            done: false,
            id : 4,
          }
      ],

      dropGroups: [
        {
          name: 'Новая задача',
          children: []
        },
        {
          name: 'В работе',
          children: []
        },
        {
          name: 'На проверке',
          children: []
        },

        {
          name: 'Выполнена',
          children: []
        }

      ]
    }
  },

  computed : {
      taskItems () {
         return this.task_items;
      }
  },

  components: {
    DragDrop,
    CustomTask,
  },


  methods : {

      save(received){
        console.log("Received:", received)
      },

      doneMarked(data) {
        data.done = true;
        alert(data.id);
      },

      originalBucketDropEvent(result) {
        console.log("Original: ", result);
      },

      destinationBucketDropEvent(columnName, result) {
        // alert(columnName);
        console.log("Destination: ", columnName, result)
      },

      cancel() {
        console.log("Cancel hit");
      },

  },

  mounted () {

    // const dragAndDrop = () => {
    //
    //       const card = document.querySelector('.js-card');
    //       const cells = document.querySelectorAll('.js-cell');
    //
    //       const dragStart = function () {
    //         setTimeout(() => {
    //           this.classList.add('hide');
    //         }, 0);
    //       };
    //
    //       const dragEnd = function () {
    //         this.classList.remove('hide');
    //       };
    //
    //       const dragOver = function (evt) {
    //         evt.preventDefault();
    //       };
    //
    //       const dragEnter = function (evt) {
    //         evt.preventDefault();
    //         this.classList.add('hovered');
    //       };
    //
    //       const dragLeave = function () {
    //         this.classList.remove('hovered');
    //       };
    //
    //       const dragDrop = function () {
    //         this.append(card);
    //         this.classList.remove('hovered');
    //       };
    //
    //       cells.forEach(cell => {
    //         cell.addEventListener('dragover', dragOver);
    //         cell.addEventListener('dragenter', dragEnter);
    //         cell.addEventListener('dragleave', dragLeave);
    //         cell.addEventListener('drop', dragDrop);
    //       });
    //
    //       card.addEventListener('dragstart', dragStart);
    //       card.addEventListener('dragend', dragEnd);
    // };

    // dragAndDrop();
  }
}
</script>

<style scoped>


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/**, *::before, *::after {*/
/*  box-sizing: border-box;*/
/*  padding: 0;*/
/*  margin: 0;*/
/*}*/

/*body {*/
/*  font-family: Arial, sans-serif;*/
/*  font-size: 16px;*/
/*  line-height: normal;*/
/*  font-weight: 400;*/
/*}*/

.hero {
  width: 100%;
  min-height: 100vh;
}

.wrapper {
  max-width: 1024px;
  margin: 0 auto;
}

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 100px 0;
}

.list__cell {
  flex-basis: calc(25% - 40px);
  min-height: 150px;
  margin: 20px;
  list-style: none;
  box-shadow: 0px 0px 7px 5px rgba(0,0,0,0.2);
  overflow: hidden;
  background-color:#f0f2f5;;
}

.list__caption {
  width: calc(25% - 40px);
  margin: 0 20px;
  list-style: none;
  font-weight: bold;
  color: #0747a6;
}

.list__card {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  text-align: center;
  min-height: 100%;
  cursor: all-scroll;
}

.list__card-header {
  text-transform: lowercase;
  font-weight: bold;
  padding: 12px 20px;
  background-color: #0747a6;
  color: white;
}

.list__card-info {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eff5ff;
  flex-grow: 1;
  padding: 12px 20px;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
}

.hovered {
  background-color: #d1d8e2;
}

.hide {
  display: none;
}

</style>
