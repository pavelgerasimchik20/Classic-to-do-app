<template>
  <div>
    <GoogleLogin :callback="callback"/>
  </div>
  <div v-if="token != ''">
    <v-btn 
    @click="logout">Logout</v-btn>
  </div>
</template>

<script>
import { decodeCredential } from "vue3-google-login";
//import VueCookies from "vue-cookies";

export default {
  data() {
    return {
      userdata: undefined,
      token: "",
    };
  },
  methods: {
    callback(response) {
      this.userdata = decodeCredential(response.credential);
      this.token = response.credential;
      localStorage.setItem("token", this.token);
    },
    logout() {
        localStorage.removeItem("token");
    }
  },
};
</script>
