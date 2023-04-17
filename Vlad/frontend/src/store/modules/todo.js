import axios from "axios";

export default {
  actions: {
    async fetchTodos({ commit }) {
        const token = localStorage.getItem("token");
        await axios
        .get("http://localhost:6060/get-todos", {
        headers: {
            Authorization: `Bearer ${token}`,
          }
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
      async updateTodo({commit}, todo) {
        console.log("text = " + todo.id)
        console.log("text = " + todo.text)
        await axios
        .put(`http://localhost:6060/update-todo/${todo.id}`, {
            value: todo.text
        })
        .then((response) => {
            commit("updateTodo", {
                _id: todo.id,
                todos: response.data.result,
                user_email: todo.user_email
            })
        })
        .catch((error) => {
            console.log(error);
        })
      },
      closeDialog({commit}) {
        commit("setDialogVisible", false);
      }
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
    },
    updateTodo(state, todo){
        const index = state.todos.findIndex(item => item._id === todo._id)

        if(index !== -1){
            state.todos[index] = todo
        }
    },
    setDialogVisible (state) {
        state.dialogVisible = false;
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
