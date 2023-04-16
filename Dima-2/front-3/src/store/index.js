import { createStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios';

export default createStore({
  state: {
    email: "",
    tasks: [],
  },

  getters: {
    allTasks: (state) => state.tasks
  },

  actions: {

    async fetchTasks({commit}) {
        const email = localStorage.getItem("email") //TODO email from localstorage or state ?
        const taskList = [];
        await axios.post('http://0.0.0.0:6600/get-todos', { email })
            .then(response => {
                response.data.result.forEach(item => {
                    let taskDetails = {
                        task_id: item.task_id,
                        name: item.task,
                        date_create: item.date_create
                    }
                    taskList.push(taskDetails);
                });
                commit("updateTasks", taskList);
            })
            .catch(error => {
                console.log(error);
            });
    },
    
    async addTask(state, newItem) {
            console.log(newItem)

            const taskToAdd = {
                user_email: localStorage.getItem("email"),
                task_id: uuidv4(),
                task: newItem,
                date_create: Date().toString()
            }
            await axios.post('http://0.0.0.0:6600/add-todo', { taskToAdd })
                .then(response => {
                    console.log(state, response);
                })
                .catch(error => {
                    console.log(error);
                });
    },
    
    async changeTask(state, updatingTask) {
            console.log("changeTask: ", updatingTask)

            const taskToUpdate = {
                task_id: updatingTask.id,
                task: updatingTask.text
            }
            await axios.post('http://0.0.0.0:6600/change-todo', { taskToUpdate })
                .then(response => {
                    console.log(state, response);
                })
                .catch(error => {
                    console.log(error);
                });
    },

    async deleteTask(state, taskId) {
        await axios.post('http://0.0.0.0:6600/delete-todo', { taskId })
            .then(response => {
                console.log(state, response);
            })
            .catch(error => {
                console.log(error);
            });
    },
    
    clearNewTaskField({commit}) {
        commit("clearNewTaskField")
    }
  },
  
  mutations: {

    updateTasks(state, fetchedTasks){
        state.tasks = fetchedTasks
    },
  },

  modules: {
  }
})
