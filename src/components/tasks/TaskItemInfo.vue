<template>
  <div>
    <div class="task__card-header">{{ item.name }}</div>

    <div class="task__card-info">
      <div style="font-style: italic; color: #0747a6; text-align: left">Краткое описание</div>
      <div style="text-align: justify; padding-left:6px; border-left: 0px #0747a6 solid">{{ item.short_desc }}</div>
    </div>

    <div style="display: flex">

      <a  @click="contentShow = !contentShow" class="btn-style"
          style="border: 1px solid rgb(176, 197, 222); width: 50%; height: 27px; padding: 0px; display: block; cursor: pointer;
              margin: 3px; text-align: center; font-style: italic; font-size: 11px;">Подробнее </a>

      <a  @click="deleteItem()" class="btn-style"
          style="border: 1px solid rgb(176, 197, 222); width: 50%; height: 27px; padding: 0px; display: block; cursor: pointer;
              margin: 3px; text-align: center; font-style: italic; font-size: 11px;"> Удалить </a>
    </div>


    <div v-if="contentShow" >

      <div class="task__card-info">
        <div style="font-style: italic; color: #0747a6; text-align: left">Полное описание</div>
        <div style="text-align: justify; padding-left:6px; border-left: 0px #0747a6 solid">{{ item.description }}</div>
      </div>

      <div class="task__card-info" style="display: flex">
        <div style="font-style: italic; color: #0747a6; text-align: left">Кто создал :</div>
        <div> {{ item.user }}</div>
      </div>

      <div class="task__card-info" style="display: flex">
        <div style="font-style: italic; color: #0747a6; text-align: left">Исполнитель :</div>
        <div> {{ item.to_username }}</div>
      </div>

      <div class="task__card-info" style="display: flex">
        <div style="font-style: italic; color: #0747a6; text-align: left">Срок исполнения :</div>
        <div> {{ item.final_date }}</div>
      </div>

      <div class="task__card-info" style="display: flex">
        <div style="font-style: italic; color: #0747a6; text-align: left">Дата создания :</div>
        <div> {{ item.created_at }}</div>
      </div>

      <div class="task__card-info" style="display: flex">
        <div style="font-style: italic; color: #0747a6; text-align: left">Проект</div>
        <div> {{ item.project_name }}</div>
      </div>

    </div>


    <!--    <div class="task__card-info">-->
    <!--      <div style="font-style: italic; color: #0747a6; text-align: left" >Полное описание</div>-->
    <!--      <div style="text-align: justify; padding-left:6px; border-left: 1px #0747a6 solid">{{item.description}}</div>-->
    <!--    </div>-->

    <!--    <div class="task__card-info" style="display: flex" >-->
    <!--      <div style="font-style: italic; color: #0747a6; text-align: left" >Кто создал : </div>-->
    <!--      <div> {{item.user}}</div>-->
    <!--    </div>-->

    <!--    <div class="task__card-info" style="display: flex" >-->
    <!--      <div style="font-style: italic; color: #0747a6; text-align: left" >Исполнитель : </div>-->
    <!--      <div> {{item.to_username}}</div>-->
    <!--    </div>-->

    <!--    <div class="task__card-info" style="display: flex" >-->
    <!--      <div style="font-style: italic; color: #0747a6; text-align: left" >Срок исполнения : </div>-->
    <!--      <div> {{item.final_date}}</div>-->
    <!--    </div>-->

    <!--    <div class="task__card-info" style="display: flex" >-->
    <!--      <div style="font-style: italic; color: #0747a6; text-align: left" >Дата создания : </div>-->
    <!--      <div> {{item.created_at}}</div>-->
    <!--    </div>-->

    <!--    <div class="task__card-info" style="display: flex" >-->
    <!--      <div style="font-style: italic; color: #0747a6; text-align: left" >Проект </div>-->
    <!--      <div> {{item.project_name}}</div>-->
    <!--    </div>-->

  </div>
</template>

<script>
export default {
  name: "TaskItemInfo",
  props: ['task'],
  data() {
    return {
      contentShow : false,
    }
  },
  computed: {
    item() {
      return this.task;
    }
  },

  methods : {
    deleteItem() {
        const taskId = this.item.task_id;
        this.$emit('delete_task', taskId);
    },
  }

}
</script>

<style scoped>

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


.hovered {
  background-color: #d1d8e2;
}

.hide {
  display: none;
}

</style>
