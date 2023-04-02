<template>
    <h1>Your ToDo</h1>
    <v-divider></v-divider>

    <div v-if="email">
        
        <div class="new__task">
            <v-text-field
                label="New task (write and press 'add' or 'enter')" 
                v-model="newTask"
                @keyup.enter="createTask"
                autofocus
                required
                >
            </v-text-field>

            <v-btn
                prepend-icon="mdi-vuetify" 
                @click="createTask"
                >
                Add
            </v-btn>

        </div>

        <h2>List {{ email }} ( 
            <v-btn 
                size="x-small" 
                @click="clearEmail"
                >log out
            </v-btn> 
            ):
        </h2>

        <div v-for="task in tasks" :key="task.task_id" class="list__tasks">
        <v-card
            class="mx-auto my-10 bg-orange-lighten-3"
            max-width="400"
            variant="elevated"
            >
                <v-card-item>
                    <div class="text-h6 text-left">{{task.task}}</div>
                </v-card-item>
                <v-card-actions>
                    <v-btn class="ml-auto" rounded="xl" variant="elevated" @click="deleteTask(task.task_id)">x</v-btn>
                </v-card-actions>
        </v-card>
        </div>

    </div>

    <div v-else>
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
            email: '', //TODO change to token
            newTask: "",
        }
    },

    methods: {
        callback(response) {
            this.userData = decodeCredential(response.credential);
            this.email = this.userData.email;
            localStorage.setItem("email", this.email)
            this.fetchTasks(this.email);
        },

        clearEmail() {
            localStorage.removeItem("email");
            location.reload();
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

.new__task {
    display: grid;
    grid-template-columns: 400px ;
    justify-content: center;
    margin: 20px 0 50px 0;
}

</style>
