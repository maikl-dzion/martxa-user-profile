<template><div>



  <pre>{{taskItems}}</pre>

</div></template>

<script>
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
}
</script>

<style scoped>

</style>
