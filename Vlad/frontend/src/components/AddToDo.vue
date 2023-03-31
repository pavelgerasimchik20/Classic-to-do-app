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

    export default {
        data() {
            return {
            todo: ""
        }
        },
        methods: {
            submitForm() {
                axios.post('http://localhost:6060/add-todo',{
                    value: this.todo
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