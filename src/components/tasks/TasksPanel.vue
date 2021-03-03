<template><div>

  <div style="display: flex" >

      <div class="list__task-panel js-cell"></div>
      <div class="list__task-panel js-cell"></div>
      <div class="list__task-panel js-cell"></div>
      <div class="list__task-panel js-cell"></div>

  </div>

  <div class="task__card js-card" draggable="true" id="t1" >
       <div class="task__card-header">Task 1</div>
       <div class="task__card-info">Task description</div>
  </div>

  <div class="task__card js-card" draggable="true" id="t1" >
      <div class="task__card-header">Task 2</div>
      <div class="task__card-info">Task description</div>
  </div>


<!--  <div class="hero">-->
<!--    <div class="wrapper">-->
<!--      <ul class="list">-->

<!--        <li class="list__caption">Planned</li>-->
<!--        <li class="list__caption">In dev</li>-->
<!--        <li class="list__caption">QA</li>-->
<!--        <li class="list__caption">Production</li>-->

<!--        <li class="list__cell js-cell">-->

<!--          <div v-for="(i) in [1, 2, 3]"-->
<!--               class="list__card js-card" draggable="true" :style="'margin-bottom:' + (i + 20)">-->
<!--               <div class="list__card-header">task {{i+1}}</div>-->
<!--               <div class="list__card-info">Task description</div>-->
<!--          </div>-->

<!--        </li>-->

<!--        <li class="list__cell js-cell"></li>-->
<!--        <li class="list__cell js-cell"></li>-->
<!--        <li class="list__cell js-cell"></li>-->

<!--      </ul>-->
<!--    </div>-->
<!--  </div>-->

  <pre>{{taskItems}}</pre>

</div></template>

<script>

const dragAndDrop = () => {

    const cards  = document.querySelectorAll('.js-card');
    const cells  = document.querySelectorAll('.js-cell');

    const dragStart = function (e) {
      console.log(e);
      setTimeout(() => {
        this.classList.add('hide');
      }, 0);
    };

    const dragEnd = function () {
      this.classList.remove('hide');
    };

    const dragOver = function (evt) {
      evt.preventDefault();
    };

    const dragEnter = function (evt) {
      evt.preventDefault();
      this.classList.add('hovered');
    };

    const dragLeave = function () {
      this.classList.remove('hovered');
    };

    const dragDrop = function () {
      this.append(card);
      this.classList.remove('hovered');
    };

    cells.forEach(cell => {
      cell.addEventListener('dragover', dragOver);
      cell.addEventListener('dragenter', dragEnter);
      cell.addEventListener('dragleave', dragLeave);
      cell.addEventListener('drop', dragDrop);
    });


    cards.forEach(cell => {
        cell.addEventListener('dragstart', dragStart);
        cell.addEventListener('dragend'  , dragEnd);
    });


};

import DragDrop from 'vue-drag-n-drop'
import CustomTask from '@/components/tasks/CustomTask'

export default {
  name: "TasksPanel",
  props : ['task_items'],

  data() {
    return {

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

      dragRun() {
        dragAndDrop();
      },

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
    this.dragRun()
  }
}
</script>

<style scoped>


/*#app {*/
/*    font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*    -webkit-font-smoothing: antialiased;*/
/*    -moz-osx-font-smoothing: grayscale;*/
/*    text-align: center;*/
/*    color: #2c3e50;*/
/*    margin-top: 60px;*/
/*}*/


.list__task-panel {
    flex-basis: calc(25% - 5px);
    margin: 5px;
    min-height: 250px;
    list-style: none;
    box-shadow: 0px 0px 7px 5px rgba(0,0,0,0.2);
    background-color:#f0f2f5;;
}


.task__card {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    text-align: center;
    min-height: 120px;
    cursor: all-scroll;
}

.task__card-header {
  text-transform: lowercase;
  font-weight: bold;
  padding: 12px 20px;
  background-color: #0747a6;
  color: white;
}

.task__card-info {
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
