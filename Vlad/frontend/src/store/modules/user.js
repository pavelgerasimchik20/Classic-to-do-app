import axios from "axios";
import {host} from "../../main"

export default {
  actions: {
    async register({ commit }, registerUser) {
        axios
          .post(`${host}/register`, {
            email: registerUser.email,
            password: registerUser.password,
          })
          .then((response) => {
            console.log(response.data);
            const responseBeginnig = response.data.split(" ")[0];
            if(responseBeginnig === "User") {
              commit("showErrorMessage", response.data);
            } else {
              commit("showErrorMessage", null);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
    async login({ commit }, loginUser) {
      axios
        .post(`${host}/login`, {
          email: loginUser.email,
          password: loginUser.password,
        })
        .then((response) => {
          console.log(response.data);
          const tokenParts = response.data.split(".");
          if (tokenParts.length == 3) {
            localStorage.setItem("token", response.data);
            commit("changeLoginFormVisible", false);
            commit("showErrorMessage", null);
          } else {
            commit("showErrorMessage", response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      commit("changeLoginFormVisible", true);
    },
  },
  mutations: {
    changeLoginFormVisible(state, value) {
      state.loginFormVisible = value;
    },
    showErrorMessage(state, errorMsg) {
        state.errorMassage = errorMsg;
    },
  },
  state: {
    loginFormVisible: localStorage.getItem("token") ? false : true,
    errorMassage: null,
  },
  getters: {
    loginVisible(state) {
      console.log(state.loginFormVisible)
      return state.loginFormVisible;
    },
    errorMessageVisible(state) {
        return state.errorMassage;
    }
  },
};
