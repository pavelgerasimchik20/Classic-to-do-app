<template>
  <v-dialog v-model="dialogVisible" max-width="600">
    <v-card>
      <v-card-title>{{ todo.todos }}</v-card-title>
      <v-card-text>
        <v-img :src="img" />
      </v-card-text>
      <EditForm :todo="todo" />
    </v-card>
  </v-dialog>
</template>

<script>
import EditForm from "./EditForm.vue";

export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  created() {
    this.dialogVisible = this.value;
  },
  data: () => ({
    dialogVisible: false,
    img: "https://clickup.com/blog/wp-content/uploads/2019/01/to-do-list-apps.png",
  }),
  watch: {
    value(newValue) {
      this.dialogVisible = newValue;
    },
    dialogVisible(newValue) {
      this.$emit("input", newValue);
    },
  },
  components: { EditForm },
};
</script>
