<template>
  <v-card
    v-for="(todo, index) in result"
    :key="index"
    @openTodo="openTodo"
    class="mx-auto"
    width="80%"
    color="grey"
    style="margin-top: 10px"
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
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      result: [],
      completedToDos: [],
      btnText: "I did",
      currentTodo: {},
    };
  },
  mounted() {
    axios
      .get("http://localhost:6060/get-todos")
      .then((response) => {
        this.result = response.data.result;
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
    deleteToDo(id) {
      console.log(`deleting ${id}`);
      axios
        .delete(`http://localhost:6060/delete-todo/${id}`)
        .then(() => {
          console.log(`deleting ${id}`);
        })
        .catch((error) => {
          console.error(error);
        });
    },
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
