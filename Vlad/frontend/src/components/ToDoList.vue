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
      :visible="dialogVisible"
      @close-dialog="closeDialog"
      :todo="currentTodo"
      v-model="dialogVisible"
    />
  </v-container>
</template>

<script>
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
    closeDialog(value){
        this.dialogVisible = value;
    }
  },
};
</script>
