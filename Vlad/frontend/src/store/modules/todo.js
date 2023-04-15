import axios from "axios";

export default {
  actions: {
    async fetchTodos({ commit }) {
      await axios
        .get("http://localhost:6060/get-todos")
        .then((response) => {
          const todos = response.data.result;
          console.log(todos);

          commit("updateTodos", todos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async createTodo({ commit }, newTodo) {
      axios
        .post("http://localhost:6060/add-todo", {
          value: newTodo.text,
          user_email: newTodo.email,
        })
        .then((response) => {
            console.log(response.data.result)
          commit("createTodo", response.data.result)
        })
        .catch((error) => {
            console.log(error);
          });
    },
    async deleteTodo({commit}, id) {
        await axios
          .delete(`http://localhost:6060/delete-todo/${id}`)
          .then(() => {
            console.log(`deleting ${id}`);
            commit("deleteTodo", id)
          })
          .catch((error) => {
            console.error(error);
          });
      },
  },
  mutations: {
    updateTodos(state, todos) {
      state.todos = todos;
    },
    createTodo(state, newTodo) {
      state.todos.push(newTodo);
    },
    deleteTodo(state, id) {
        state.todos = state.todos.filter(todo => todo._id != id)
    }
  },
  state: {
    todos: [],
  },
  getters: {
    allTodos(state) {
      return state.todos;
    },
  },
};
