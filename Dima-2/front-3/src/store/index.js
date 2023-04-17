import { createStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

export default createStore({
  state: {
    token: "",
    isAuth: false,
    tasks: [],
    isRefresh: false
  },

  getters: {
    isAuth: (state) => state.isAuth,
    isRefreshStatus: (state) => state.isRefresh,
    allTasks: (state) => state.tasks
  },

  actions: {

    async fetchTasks({commit, state}) {
        commit("updateIsRefresh", true)
        const email = localStorage.getItem("email") //TODO email from localstorage or state ?
        const taskList = []
        await axios.post(
                'http://0.0.0.0:6600/get-todos', 
                { email },
                {
                    headers: {
                        'Authorization': state.token
                    }
                }
            )
            .then(response => {
                response.data.result.forEach(item => {
                    let taskDetails = {
                        task_id: item.task_id,
                        name: item.task,
                        date_create: item.date_create
                    }
                    taskList.push(taskDetails)
                })
                console.log("fetchTasks response: ", response)
                commit("updateTasks", taskList)
                commit("updateIsRefresh", false)
            })
            .catch(error => {
                console.log(error)
                commit("updateIsRefresh", false)
            })
    },
    
    async addTask({commit, state}, newItem) {
            commit("updateIsRefresh", true)
            const taskToAdd = {
                task_id: uuidv4(),
                task: newItem,
                date_create: Date().toString()
            }
            await axios.post('http://0.0.0.0:6600/add-todo', 
                    { taskToAdd },
                    {
                        headers: {
                            'Authorization': state.token
                        }
                    }
                )
                .then(response => {
                    console.log(response)
                    commit("updateIsRefresh", false)
                })
                .catch(error => {
                    console.log(error)
                    commit("updateIsRefresh", false)
                })
    },
    
    async changeTask({state}, updatingTask) {
            console.log("changeTask: ", updatingTask)

            const taskToUpdate = {
                task_id: updatingTask.id,
                task: updatingTask.text
            }
            await axios.post(
                    'http://0.0.0.0:6600/change-todo', 
                    { taskToUpdate },
                    {
                        headers: {
                            'Authorization': state.token
                        }
                    }
                )
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
    },

    async deleteTask({state}, taskId) {
        await axios.post(
                'http://0.0.0.0:6600/delete-todo', 
                { taskId },
                {
                    headers: {
                        'Authorization': state.token
                    }
                }
            )
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    },
    
    clearNewTaskField({commit}) {
        commit("clearNewTaskField")
    },

    async checkToken({commit, state}){
        commit("updateToken", localStorage.getItem("token"))
        await axios.post('http://0.0.0.0:6600/check-auth', {}, 
        {
            headers: {
                'Authorization': state.token
            }
        })
        .then(response => {
            if(response.data.message !== "Valid token") {
                commit("updateIsAuth", false); 
                commit("updateToken", "")
            }
            commit("updateIsAuth", true)
        })
        .catch(error => {
            console.log(error)
        })
    },
    login({commit}, response){
        const token = response.credential
        localStorage.setItem("token", token)
        commit("updateToken", token)
        commit("updateIsAuth", true)
    },
    logOut() {

        localStorage.removeItem("token")
    }

},
  
  mutations: {
    updateToken(state, token){
        state.token = token
    },
    updateIsAuth(state, isAuth){
        state.isAuth = isAuth ? true : false
    },
    updateTasks(state, fetchedTasks){
        state.tasks = fetchedTasks
    },
    updateIsRefresh(state, statusIsRefresh){
        state.isRefresh = statusIsRefresh
    }
  },

  modules: {
  }
})
