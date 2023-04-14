import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export default {
    actions: {
        async fetchTodos(context, email){
            await axios.post(`http://localhost:6060/getByEmail/${email}`)
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
              context.commit('addTodo', response.data.result)
            })
            .catch(error => {
              console.log("Error during addTodo: " + error);
            });
        },
        async removeTodo(context, id) {
            axios.delete(`http://localhost:6060/delete/${id}`)
            .then(() => {
              context.commit('removeTodo', id)
            })
            .catch((error) => {
              console.log(error);
            });
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