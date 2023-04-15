<template>
  <div>
    <h3>This is your list of tasks</h3>
    <AddToDo />
    <ToDoList />
  </div>
</template>

<script>
import AddToDo from "@/components/AddToDo.vue";

import ToDoList from "@/components/ToDoList.vue";

export default {
  components: {
    ToDoList,
    AddToDo,
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    currentTodo: {},
    dialogVisible: false,
  }),
  methods: {
    openTodo(todo) {
      this.currentTodo = todo;
      this.dialogVisible = true;
    },
  },
};
</script>
