<template>
<div>
    <div class="task__card-header">{{item.name}}</div>

    <div class="task__card-info">
      <div style="font-style: italic; color: #0747a6; text-align: left" >Краткое описание</div>
      <div style="text-align: justify; padding-left:6px; border-left: 1px #0747a6 solid">{{item.short_desc}}</div>
    </div>

    <div class="task__card-info">
      <div style="font-style: italic; color: #0747a6; text-align: left" >Полное описание</div>
      <div style="text-align: justify; padding-left:6px; border-left: 1px #0747a6 solid">{{item.description}}</div>
    </div>

    <div class="task__card-info" style="display: flex" >
      <div style="font-style: italic; color: #0747a6; text-align: left" >Кто создал : </div>
      <div> {{item.user}}</div>
    </div>

    <div class="task__card-info" style="display: flex" >
      <div style="font-style: italic; color: #0747a6; text-align: left" >Исполнитель : </div>
      <div> {{item.to_username}}</div>
    </div>

    <div class="task__card-info" style="display: flex" >
      <div style="font-style: italic; color: #0747a6; text-align: left" >Срок исполнения : </div>
      <div> {{item.final_date}}</div>
    </div>

    <div class="task__card-info" style="display: flex" >
      <div style="font-style: italic; color: #0747a6; text-align: left" >Дата создания : </div>
      <div> {{item.created_at}}</div>
    </div>

    <div class="task__card-info" style="display: flex" >
      <div style="font-style: italic; color: #0747a6; text-align: left" >Проект </div>
      <div> {{item.project_name}}</div>
    </div>

</div>
</template>

<script>
export default {
  name: "TaskItemInfo",
  props:['task'],
  computed : {
     item() {
        return this.task;
     }
  }

}
</script>

<style scoped>

.task__card {

  border: 1px #b0c5de solid;
  background: white;
  margin-bottom: 10px;
  padding:1px;
  font-size: 12px;
  font-weight: normal;
  box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.2);
  cursor: all-scroll;

  /*width: 270px;*/
  /*text-align: center;*/
  /*height: 120px;*/
  /*cursor: all-scroll;*/
  /*margin: 2px auto 20px auto;*/
  /*overflow: hidden;*/
}

.task__card-header {
  font-style: italic;
  border: #b0c5de 0px solid;
  background-color: #0747a6;
  color:white;
  font-weight: bold;
  font-size: 13px;
  min-height: 32px;
  /*width: 100%;*/
  /*text-transform: lowercase;*/
  /*font-weight: bold;*/
  /*padding: 8px;*/
  /*background-color: #0747a6;*/
  /*color: white;*/
}

.task__card-info {
  margin:4px;
  padding:3px;
  border: gray 0px solid;
  background-color: #eff5ff;

  /*width: 100%;*/
  /*background-color: #eff5ff;*/
  /*padding: 8px;*/
  /*font-size: 14px;*/
  /*text-transform: uppercase;*/
  /*font-weight: 600;*/
}


.hovered {
  background-color: #d1d8e2;
}

.hide {
  display: none;
}

</style>
