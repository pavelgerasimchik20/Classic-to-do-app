<template>
  <v-container style="width: 40%" class="mx-auto">
    <div v-if="!token">
      <v-form @submit.prevent="login">
        <v-text-field
          v-model="loginUser.email"
          label="Email"
          type="email"
          required
        ></v-text-field>
        <v-text-field
          v-model="loginUser.password"
          label="Password"
          type="password"
          required
        ></v-text-field>
        <v-btn type="submit" color="primary">Login</v-btn>
      </v-form>
    </div>
    <div v-else>
      <v-btn color="red" @click="logout"> Logout </v-btn>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loginUser: {
        email: "",
        password: "",
      },
      token: localStorage.getItem("token"),
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:6060/login", {
          email: this.loginUser.email,
          password: this.loginUser.password,
        })
        .then((response) => {
          console.log(response.data);
          this.token = response.data;
          localStorage.setItem("token", this.token);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout() {
      localStorage.removeItem("token");
      this.token = null;
    },
  },
};
</script>
