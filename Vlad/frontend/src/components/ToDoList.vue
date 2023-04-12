<!-- <template>
  <v-card
    v-for="(todo, index) in result"
    :key="index"
    @openTodo="openTodo"
    class="mx-auto mt-2"
    width="80%"
    color="grey"
  >
    <v-card-text
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: black;
      "
    >
      {{ todo.todos }}
      <v-btn
        :color="getButtonColor(index)"
        margin-left="20px"
        @click="pressIDid(todo._id, index)"
        >{{ getButtonText(index) }}</v-btn
      >
    </v-card-text>
  </v-card>
</template> -->

<template>
  <v-container>
    <v-row>
      <OneTodo
        v-for="todo in todos"
        :todo="todo"
        :key="todo"
        @openTodo="openTodo"
      ></OneTodo>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import OneTodo from "../components/OneTodo";

export default {
  components: {
    OneTodo,
  },
  data() {
    return {
      todos: [],
      completedToDos: [],
      btnText: "I did",
      currentTodo: {},
    };
  },
  mounted() {
    axios
      .get("http://localhost:6060/get-todos")
      .then((response) => {
        this.todos = response.data.result;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    toggleComplete(index) {
      if (this.completedToDos.includes(index)) {
        this.completedToDos.splice(this.completedToDos.indexOf(index), 1);
      } else {
        this.completedToDos.push(index);
      }
    },
    // deleteToDo(id) {
    //   console.log(`deleting ${id}`);
    //   axios
    //     .delete(`http://localhost:6060/delete-todo/${id}`)
    //     .then(() => {
    //       console.log(`deleting ${id}`);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },
    pressIDid(id, index) {
      this.deleteToDo(id);
      this.toggleComplete(index);
    },
    openTodo(todo) {
      this.currentTodo = todo;
      this.dialogVisible = true;
    },
  },
  computed: {
    getButtonColor() {
      return (index) => {
        if (this.completedToDos.includes(index)) {
          return "success";
        } else {
          return "warning";
        }
      };
    },
    getButtonText() {
      return (index) => {
        if (this.completedToDos.includes(index)) {
          return "Done!";
        } else {
          return "I did";
        }
      };
    },
  },
};
</script>
