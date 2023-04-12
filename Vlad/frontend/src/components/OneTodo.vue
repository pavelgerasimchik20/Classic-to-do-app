<template>
  <v-col cols="4">
    <v-card @click="openTodo">
      <v-card-title>{{ todo.todos }}</v-card-title>
      <v-card-text>
        <v-img class="mx-auto" width="200px" height="200px" :src="img" />
      </v-card-text>
      <DoneBtnComp :todoId="todo._id" class="mb-3" />
    </v-card>
  </v-col>
</template>

<script>
import DoneBtnComp from "./buttons/DoneBtnComp.vue";

export default {
  components: {
    DoneBtnComp,
  },
  data() {
    return {
      img: "https://clickup.com/blog/wp-content/uploads/2019/01/to-do-list-apps.png",
    };
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteTodo(id) {
        this.$emit('delete', id)
    },
    openTodo() {
      this.$emit("openTodo", this.todo);
    },
  },
};
</script>
