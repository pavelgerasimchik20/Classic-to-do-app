<template>
  <v-dialog v-model="dialogVisible" max-width="600">
    <v-card>
      <v-card-title>{{ todo.todos }}</v-card-title>
      <v-card-text>
        <v-img :src="img" />
      </v-card-text>
      <EditForm :todo="todo" :dialogVisible="dialogVisible" @close-dialog="closeDialog"/>
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
    text: null,
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
    dialogVisibleFalse(){
        this.$emit('update:dialogVisible', false)
    }
  },
  components: { EditForm },
  methods: {
    closeDialog(value) {
        this.$emit('close-dialog', value);
    }
  }
};
</script>
