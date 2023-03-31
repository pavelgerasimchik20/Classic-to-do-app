<template>
    <h1>Your ToDo</h1>

    <div v-if="tasks.length > 0">

        <div class="new__task">
        <v-text-field label="New task" v-model="newTask" ></v-text-field>

        <v-btn prepend-icon="mdi-vuetify" @click="createTask">
            Add task
        </v-btn>
    </div>

        <h2>List:</h2>
        <ul>
            <li v-for="task in tasks" :key="task.task_id">
                <p>{{ task.task }}</p>
                <v-btn @click="deleteTask(task.task_id)">delete</v-btn>
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
import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'App',
    // components: {
    //     LoginComponent
    // },

    data() {
        return {
            tasks: [],
            userData: null,
            email: '',
            newTask: ""
        }
    },

    methods: {
        callback(response) {
            localStorage.setItem("key", JSON.stringify(response.credential))
            this.userData = decodeCredential(response.credential);
            this.email = this.userData.email;
            localStorage.setItem("email", this.email)
            this.fetchTasks(this.email);
        },

        async fetchTasks() {
            const email = this.email;
            axios.post('http://0.0.0.0:6600/get-todos', { email })
                .then(response => {
                    this.tasks = response.data.result;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        async createTask() {
            const taskToAdd = {
                user_email: localStorage.getItem("email"),
                task_id: uuidv4(),
                task: this.newTask,
                date_create: Date().toString()
            }
            axios.post('http://0.0.0.0:6600/add-todo', { taskToAdd })
                .then(response => {
                    if (response.data.result == "task was added") {
                        this.newTask = "";
                        this.fetchTasks();
                    }
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        },

        async deleteTask(taskId) {
            axios.post('http://0.0.0.0:6600/delete-todo', { taskId })
                .then(response => {
                    if (response.data.result == "deleted") {
                        this.fetchTasks();
                    }
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },

    mounted() {
        this.email = localStorage.getItem("email");
        this.fetchTasks();
    },

    // watch: {
    //     tasks() {
    //         this.fetchTasks()
    //     }
    // }

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

.new__task {
    display:grid;
    grid-template-columns: 60vw 40vw;
}
</style>
