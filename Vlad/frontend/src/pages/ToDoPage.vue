<template>
  <h3>This is your list of tasks</h3>
  <AddToDo />
  <ToDoList />
</template>

<script>
import AddToDo from '@/components/AddToDo.vue';
import ToDoList from '@/components/ToDoList.vue';

export default {
    components: {
    ToDoList,
    AddToDo
}
}
</script>