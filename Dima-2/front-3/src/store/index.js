import { createStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

const host = process.env.VUE_APP_BACK_HOST

export default createStore({
  state: {
    token: "",
    isAuth: false,
    tasks: [],
    isLoading: false
  },

  getters: {
    isAuth: (state) => state.isAuth,
    isLoadingStatus: (state) => state.isLoading,
    allTasks: (state) => state.tasks
  },

  actions: {

    async fetchTasks({commit, state}) {
        commit("updateIsLoading", true)
        const taskList = []
        await axios.post(
                `${host}/get-todos`, 
                { },
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
                commit("updateIsLoading", false)
            })
            .catch(error => {
                console.log(error)
                commit("updateIsLoading", false)
            })
    },
    
    async addTask({commit, state}, newItem) {
            commit("updateIsLoading", true)
            const taskToAdd = {
                task_id: uuidv4(),
                task: newItem,
                date_create: Date().toString()
            }
            await axios.post(
                    `${host}/add-todo`, 
                    { taskToAdd },
                    {
                        headers: {
                            'Authorization': state.token
                        }
                    }
                )
                .then(response => {
                    console.log(response)
                    commit("updateIsLoading", false)
                })
                .catch(error => {
                    console.log(error)
                    commit("updateIsLoading", false)
                })
    },
    
    async changeTask({state}, updatingTask) {
            console.log("changeTask: ", updatingTask)

            const taskToUpdate = {
                task_id: updatingTask.id,
                task: updatingTask.text
            }
            await axios.post(
                    `${host}/change-todo`, 
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
                `${host}/delete-todo`, 
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
        await axios.post(
            `${host}/check-auth`, 
            {}, 
            {
                headers: {
                    'Authorization': state.token
                }
            }
        )
        .then(response => {
            if(response.data.message == "Valid token") {
                commit("updateIsAuth", true)
            }
            else {
                commit("updateIsAuth", false) 
                commit("updateToken", "")            }
        })
        .catch(error => {
            commit("updateIsAuth", false)
            commit("updateToken", "")
            console.log(error)
        })
    },

    login({commit}, response){
        const token = response.credential
        localStorage.setItem("token", token)
        commit("updateToken", token)
        commit("updateIsAuth", true)
    },
    
    logOut({commit}) {
        commit("updateToken", "")
        commit("updateIsAuth", false)
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
    updateIsLoading(state, statusIsLoading){
        state.isLoading = statusIsLoading
    }
  },
})
