<template>
    <v-form @submit.prevent="submitForm" style="width: 80%" class="mx-auto">
        <v-text-field v-model="todo.text" label="Your task"></v-text-field>
        <v-btn type="submit" color="success">Create</v-btn>
        <v-btn @click="clearInput">
            clear
          </v-btn>
    </v-form>
</template>

<script>
    import { decodeCredential } from 'vue3-google-login';
    // import { mapMutations } from 'vuex';

    export default {
        data() {
            return {
            todo: {
            text: "",
            email: decodeCredential(localStorage.getItem("token")).email,
            }
        }
        },
        methods: {
            submitForm() {
                this.$store.dispatch("createTodo", this.todo);
                this.todo.text = "";
            },
            clearInput() {
                this.todo = "";
            }
        }
    }
</script>