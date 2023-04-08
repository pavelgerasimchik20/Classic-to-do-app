<template>

    <div>
        <div>
            <v-textarea
                label="New task (write and press 'add' or 'enter')" 
                v-model="newTask"
                @keyup.enter="createTask"
                autofocus
                required
                >
            </v-textarea>
            
            <div >
                <p 
                    v-if="newTaskLength > 0 && newTaskLength < 4"
                    class="text-h7"
                    >
                    minimum 3 symbols
                </p>
            </div>

            <v-progress-circular 
                v-if="creatingTask"
                indeterminate
                color="black"
                >
            </v-progress-circular>

            <v-btn
                v-else
                prepend-icon="mdi-vuetify" 
                @click="createTask"
                >
                Add
            </v-btn>
        </div>

        <div v-for="task in tasks" :key="task.task_id" class="list__tasks">
            <v-card
                class="d-flex mx-auto my-5 bg-orange-lighten-3"
                width="400"
                variant="elevated"
                >
                    <v-card-text class="ma-2 pa-2 me-auto">
                        <div class="text-h7 text-left">{{task.task}}</div>
                    </v-card-text>

                    <div class="ma-2 pa-2 align-baseline w-25">
                    <v-card-actions class="d-flex align-center">

                        <v-progress-circular 
                            v-if="task.task_id == deletingTask"
                            indeterminate
                            color="black"
                            >
                        </v-progress-circular>

                        <v-btn 
                            v-else
                            class="ml-auto" 
                            rounded="xl" 
                            variant="elevated" 
                            @click="deleteTask(task.task_id)"
                            >x
                        </v-btn>

                    </v-card-actions>
                </div>
            </v-card>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default {
    emits: ['response'],

    data() {
        return {
            tasks: [
                {
                    user_email: "9792910@gmail.com",
                    task_id: "00bd3250-89ea-4d20-bdd1-3481f5905cfa",
                    task: "Welcome task",
                    date_create: "Sun Apr 02 2023 11:41:43 GMT+0300 (Israel Daylight Time)"
                }
            ],
            isResult: false,
            newTask: "",
            errors: [],
            deletingTask: "",
            creatingTask: false
        }
    },

    methods: {
        callback(response) {
            localStorage.setItem("token", response.credential);
            this.fetchTasks();
        },

        clearEmail() {
            localStorage.removeItem("email");
            location.reload();
        },

        async fetchTasks() {
            const token = localStorage.getItem("token");
            axios.post('http://0.0.0.0:6600/get-todos', { token })
                .then(response => {
                    this.isResult = true;
                    this.tasks = response.data.result;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        async createTask() {
            this.creatingTask = true;
            const taskToAdd = {
                user_email: localStorage.getItem("email"),
                task_id: uuidv4(),
                task: this.newTask,
                date_create: Date().toString()
            }
            await axios.post('http://0.0.0.0:6600/add-todo', { taskToAdd })
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
            this.creatingTask = false;
        },

        async deleteTask(taskId) {
            this.deletingTask = taskId;
            await axios.post('http://0.0.0.0:6600/delete-todo', { taskId })
                .then(response => {
                    if (response.data.result == "deleted") {
                        this.fetchTasks();
                    }
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
            this.deletingTask = "";
        }

    },

    mounted() {
        this.email = localStorage.getItem("email");
        this.$emit('response', this.email)
        this.fetchTasks();
    },

    computed: {
        newTaskLength(){
            return this.newTask.length;
        }
    }

}

</script>
