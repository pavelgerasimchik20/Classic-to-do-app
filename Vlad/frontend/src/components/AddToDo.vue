<template>
    <v-form @submit.prevent="submitForm" style="width: 80%" class="mx-auto">
        <v-text-field v-model="todo" label="Your task"></v-text-field>
        <v-btn type="submit" color="success">Create</v-btn>
        <v-btn @click="clearInput">
            clear
          </v-btn>
    </v-form>
</template>

<script>
    import axios from 'axios';
    import VueCookies from 'vue-cookies';
    import { decodeCredential } from 'vue3-google-login';

    export default {
        data() {
            return {
            todo: "",
            email: decodeCredential(VueCookies.get('token')).email,
        }
        },
        methods: {
            submitForm() {
                console.log(this.email);
                axios.post('http://localhost:6060/add-todo',{
                    value: this.todo,
                    user_email: this.email
                })
                .then(response => {
                    console.log(response.data);
                    this.todo = "";
                })
                .catch(error => {
                    console.log(error);
                })
            },
            clearInput() {
                this.todo = "";
            }
        }
    }
</script>