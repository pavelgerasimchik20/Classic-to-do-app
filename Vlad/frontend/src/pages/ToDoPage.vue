<template>
  <div v-if="!loginVisible">
    <h3>This is your list of tasks</h3>
    <AddToDo />
    <ToDoList />
  </div>
  <div v-else><h1>You need to log in or sign up</h1></div>
</template>

<script>
import AddToDo from "@/components/AddToDo.vue";
import ToDoList from "@/components/ToDoList.vue";

import { mapGetters } from "vuex";

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
  computed: {
    ...mapGetters(["loginVisible"])
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
