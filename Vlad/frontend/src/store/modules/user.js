import axios from "axios";

export default {
  state: {
    email: "",
    password: "",
  },
  mutations: {
    SET_EMAIL(state, email) {
      state.email = email;
    },
    SET_PASSWORD(state, password) {
      state.password = password;
    },
  },
  actions: {
    async login({ state }, loginUser) {
      await axios
      .post("http://localhost:6060/login", {
        email: loginUser.email,
        password: loginUser.password
      })
      .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error);
      });
      console.log(
        "Logged in with email:",
        state.email,
        "and password:",
        state.password
      );
    },
  },
};
