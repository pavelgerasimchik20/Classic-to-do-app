import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const host = process.env.VUE_APP_LOCAL_HOST

export default {
    actions: {
        async fetchTodos(context, email){
            await axios.post(`${host}/getByEmail/${email}`)
            .then(response => {
                context.commit('updateTodos', response.data.result)
            })
            .catch(error => {
                 console.log(error);
             });
        },
        async addTodo(context, newObject){
            await axios.post('http://localhost:6060/add', JSON.stringify({
                email: newObject.email,
                text: newObject.text
            }))
            .then(response => {
                console.log('RETURNED >>>>> ', response.data.result);
              context.commit('addTodo', response.data.result)
            })
            .catch(error => {
              console.log("Error during addTodo: " + error);
            });
        },
        async removeTodo(context, id) {
            await axios.delete(`http://localhost:6060/delete/${id}`)
            .then(() => {
              context.commit('removeTodo', id)
            })
            .catch((error) => {
              console.log(error); 
            });
        },
        async updateTodo(context, updatedObject) {
            if (updatedObject.email && updatedObject.text) { 
                await axios.put(`http://localhost:6060/update/${updatedObject.id}`, { 
                    email: updatedObject.email,
                    text: updatedObject.text
                })
                .then(response => {
                   console.log('RETURNED >>>>> ', response.data.result);
                   const freshTodo = {
                     _id: updatedObject.id,
                     createDate: response.data.result.createDate ,      
                     email: response.data.result.email,
                     text: response.data.result.text
                   }
                   console.log('freshTodo >>>>> ', freshTodo);
                   context.commit('refreshTodo', freshTodo )
                })
                .catch(error => {
                   console.log(error);
                });
            }else {
                console.log('no data')
            }
        }
    },
    mutations: {
        addTodo(state, todo){
            state.todos.unshift(todo)
        },
        updateTodos(state, todos){
            state.todos = todos
        },
        removeTodo(state, id){
            state.todos = state.todos.filter(todo => todo._id != id)
        },
        refreshTodo(state, updatedTodo) {
            const index = state.todos.findIndex(todo => todo._id === updatedTodo._id);
            if (index !== -1) {
              state.todos.splice(index, 1, updatedTodo);
            }
        }
    },
    state: {
        todos: []
    },
    getters: {
        allTodos(state){
            return state.todos
        },
        activeTodos(state){
            return state.todos.length
        }
    },
}