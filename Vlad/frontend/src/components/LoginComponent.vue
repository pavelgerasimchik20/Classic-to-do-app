<template>
    <div v-if="errorMessageVisible">{{errorMessageVisible}}</div>
  <v-container style="width: 40%" class="mx-auto">
    <div v-if="loginVisible">
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
        <v-btn type="submit" color="green" class="mr-3">Log in</v-btn>
        <v-btn color="orange"><RouterLink to="/register">Sign up</RouterLink></v-btn>
      </v-form>
    </div>
    <div v-else>
        <h2>You successfully logged in</h2>
      <v-btn color="red" @click="logout"> Logout </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loginUser: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters(["loginVisible", "errorMessageVisible"]),
  },
  methods: {
    login() {
      this.$store.dispatch("login", this.loginUser);
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
