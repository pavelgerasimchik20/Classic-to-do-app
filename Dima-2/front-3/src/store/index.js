import { createStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid'


export default createStore({
  state: {
    // token: "",
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
    newTaskValue(state, newTask) {
        state.newTask = newTask
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
    clearTask(state){
        state.newTask = ""
    }
  },

  actions: {
    newTaskValue({commit}, task){
        commit("newTaskValue", task)
    },
    addTask({commit}, task) {
        commit("addTask", task)
    },
    clearTask({commit}) {
        commit("clearTask")
    }
  },

  modules: {
  }
})
