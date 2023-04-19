import axios from "axios";
import { decodeCredential } from "vue3-google-login";

const host = process.env.VUE_APP_LOCAL_HOST;

export default {
  actions: {
    async fetchTodos({ commit }) {
      const token = localStorage.getItem("token");
      const user_email = decodeCredential(token).email;
      console.log(host)
      console.log(token);
      console.log(user_email);
      await axios
        .get(`http://localhost:6060/get-todos-by-email/${user_email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
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
      const token = localStorage.getItem("token");
      axios
        .post(
          `http://localhost:6060/add-todo`,
          {
            value: newTodo.text,
            user_email: newTodo.email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data.result);
          commit("createTodo", response.data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteTodo({ commit }, id) {
      const token = localStorage.getItem("token");
      await axios
        .delete(`http://localhost:6060/delete-todo/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          console.log(`deleting ${id}`);
          commit("deleteTodo", id);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async updateTodo({ commit }, todo) {
      const token = localStorage.getItem("token");
      await axios
        .put(
          `http://localhost:6060/update-todo/${todo.id}`,
          {
            value: todo.text,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          commit("updateTodo", {
            _id: todo.id,
            todos: response.data.result,
            user_email: todo.user_email,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeDialog({ commit }) {
      commit("setDialogVisible", false);
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
      state.todos = state.todos.filter((todo) => todo._id != id);
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex((item) => item._id === todo._id);

      if (index !== -1) {
        state.todos[index] = todo;
      }
    },
    setDialogVisible(state) {
      state.dialogVisible = false;
    },
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
