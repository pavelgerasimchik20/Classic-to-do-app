<template>
    <v-container style="width: 40%" class="mx-auto">
        <h2>Please register</h2>
        <br />
        <h5 style="color: red">{{errorMessageVisible}}</h5>
          <v-form @submit.prevent="signup">
            <v-text-field
              v-model="registerUser.email"
              label="Email"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="registerUser.password"
              label="Password"
              type="password"
              required
            ></v-text-field>
            <v-btn type="submit" color="green" class="mr-3">Sign up</v-btn>
          </v-form>
      </v-container>
</template>

<script>
import { useRouter } from "vue-router";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      registerUser: {
        email: "",
        password: "",
      },
      router: useRouter()
    };
  },
  computed: {
    ...mapGetters(["errorMessageVisible"]),
  },
  methods: {
    signup() {
      this.$store.dispatch("register", this.registerUser);
      this.clearInput();
      if(!this.errorMessageVisible) {
      this.router.push("login");
      }
    },
    clearInput() {
        this.registerUser.email = "";
        this.registerUser.password = "";
    }
  },
};
</script>