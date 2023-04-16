<template>
  <v-form
    @submit.prevent="submitForm(todo._id)"
    style="width: 80%"
    class="mx-auto"
  >
    <v-text-field v-model="todos" label="Edit task"></v-text-field>
    <v-btn type="submit" color="success" class="mx-auto mb-3 mr-2">Update</v-btn>
    <v-btn @click="clearInput" class="mx-auto mb-3 ml-2"> clear </v-btn>
  </v-form>
</template>

<script>
import { decodeCredential } from "vue3-google-login";
import { mapActions } from "vuex";

export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
    dialogVisible: {
        type: Boolean,
        required: true
    }
  },
  data() {
    return {
      todos: "",
    };
  },
  methods: {
    ...mapActions(["updateTodo"]),
    onUpdate() {
        this.closeDialog();
    },
    submitForm(id) {
        this.updateTodo({
            id: id,
            text: this.todos,
            user_email: decodeCredential(localStorage.getItem("token")).email,
        });
        this.$emit('close-dialog', false);
        this.clearInput();
    },
    clearInput() {
        this.todos = "";
    }
    
}
};
</script>
