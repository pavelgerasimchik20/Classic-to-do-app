import axios from 'axios';
import VueCookies from 'vue-cookies';
import { decodeCredential } from 'vue3-google-login'

export default {
    actions: {
        async fetchTodos(context){
            const email = decodeCredential(VueCookies.get('token')).email
            axios.post(`http://localhost:6060/getByEmail/${email}`)
            .then(response => {
               // this.todos = response.data.result;
                context.commit('updateTodos', response.data.result)
            })
            .catch(error => {
                 console.log(error);
             });
        }
    },
    mutations: {
        updateTodos(state, todos){
            state.todos = todos
        }
    },
    state: {
        todos: []
    },
    getters: {
        allTodos(state){
            return state.todos
        }
    },
}