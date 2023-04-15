import { createStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios';

export default createStore({
  state: {
    email: "",
    newTask: "",
    tasks: [
        {
            user_email: "9792910@gmail.com",
            task_id: "00bd3250-89ea-4d20-bdd1-3481f5905cfa",
            name: "Hello task",
            date_create: "Sun Apr 02 2023 11:41:43 GMT+0300 (Israel Daylight Time)"
        },
        {
            user_email: "9792910@gmail.com",
            task_id: "00bd3250-89ea-4d20-bdd1-3481f5905cfs",
            name: "Bye bye task",
            date_create: "Sun Apr 02 2023 11:41:45 GMT+0300 (Israel Daylight Time)"
        },
    ],
  },

  getters: {
    allTasks: (state) => state.tasks
  },
  
  mutations: {
    updateTasks(state, fetchedTasks){
        state.tasks = fetchedTasks
    },

    newTaskValue({commit}, state, newTaskValue) {
        state.newTask = newTaskValue
        commit("newTaskValue", newTaskValue)
    },
    
    addTask(state){
        state.tasks.push(
            {
                user_email: "9792910@gmail.com",
                task_id: uuidv4(),
                name: state.newTask,
                date_create: Date().toString()
            }
        )
    },

    clearNewTaskField(state){
        state.newTask = ""
    }
  },

  actions: {
    async fetchTasks({commit}) {
        const email = localStorage.getItem("email") //TODO email from localstorage or state ?
        const taskList = [];
        await axios.post('http://0.0.0.0:6600/get-todos', { email })
            .then(response => {
                response.data.result.forEach(item => {
                    let itemDetails = {
                        task_id: item.task_id,
                        name: item.task,
                        date_create: item.date_create
                    }
                    taskList.push(itemDetails);
                });
                commit("updateTasks", taskList);
            })
            .catch(error => {
                console.log(error);
            });
    },

    newTaskValue({commit}, task){
        commit("newTaskValue", task)
    },
    
    addTask({commit}, task) {
        commit("addTask", task)
    },
    
    clearNewTaskField({commit}) {
        commit("clearNewTaskField")
    }
  },

  modules: {
  }
})
