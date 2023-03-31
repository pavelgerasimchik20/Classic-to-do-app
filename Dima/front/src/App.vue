<template>
    <h1>Your ToDo</h1>

    <div v-if="tasks.length > 0">

        <p> Create task </p>

        <h2>List:</h2>
        <ul>
            <li v-for="task in tasks" :key="task.task_id">
                <p>{{ task.task }}</p>
            </li>
        </ul>
    </div>

    <div v-else-if="!email">
        <p> SignIn to see you todo:</p>
        <GoogleLogin :callback="callback" />
    </div>
</template>

<script>
import axios from 'axios';
import { decodeCredential } from 'vue3-google-login';

export default {
    name: 'App',

    // components: {
    //     LoginComponent
    // },

    data() {
        return {
            tasks: [],
            userData: null,
            email: ''
        }
    },

    methods: {
        callback(response) {
            localStorage.setItem("key", JSON.stringify(response.credential))
            this.userData = decodeCredential(response.credential);
            this.email = this.userData.email;
            this.fetchTasks(this.email);
        },

        async fetchTasks(email) {
            axios.post('http://0.0.0.0:6600/get-todos', { email })
                .then(response => {
                    this.tasks = response.data.result;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        async createTask(task) {
            const newTask = {
                user_email: localStorage.getItem("key"),
                task_id: ,
                task: task,
                date_create: string
            }
        }
    },

    mounted() {
        this.fetchTasks()
    }

}

</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
