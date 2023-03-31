<template>
    <v-card
      v-for="todo in result"
      :key="todo._id"
      class="mx-auto"
      width="80%"
      color="grey"
      style="margin-top: 10px"
    >
      <v-card-text
        style="display: flex; align-items: center; justify-content: space-between"
      >
        {{ todo.todos }}
        <v-btn
          :id="todo._id"
          margin-left="20px"
          @click="btnChange(todo._id)"
          :color="btnColor(todo._id)"
          >{{ isActive[todo._id] ? "Done" : "I did" }}</v-btn
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
        isActive: {},
        btnColor: "warning"
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
      btnChange(id) {
        this.isActive = {};
        this.isActive[id] = true;
      },
      colorChange(id) {
        if (this.isActive[id]) {
            return this.btnColor = "success";
        } else return this.btnColor = "warning"
      }
    },
  };
  </script>
  