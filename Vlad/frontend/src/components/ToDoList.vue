<template>
  <v-container>
    <v-row>
      <OneTodo
        v-for="todo in allTodos"
        :todo="todo"
        :key="todo._id"
        @openTodo="openTodo"
      ></OneTodo>
    </v-row>
    <DialogTodo
      :todo="currentTodo"
      :dialog-visible="dialogVisible"
      v-model="dialogVisible"
    />
  </v-container>
</template>

<script>
// import axios from "axios";
import OneTodo from "../components/OneTodo";
import DialogTodo from "./DialogTodo.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    OneTodo,
    DialogTodo,
  },
  computed: {
    ...mapGetters(["allTodos"]),
    // objects() {
    //   return this.allTodos;
    // },
  },
  data() {
    return {
      currentTodo: {},
      dialogVisible: false,
    };
  },
  mounted() {
    this.fetchTodos();
  },
  methods: {
    ...mapActions(["fetchTodos"]),
    openTodo(todo) {
      this.currentTodo = todo;
      this.dialogVisible = true;
    },
  },
};
</script>
