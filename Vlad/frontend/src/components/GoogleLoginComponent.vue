<template>
  <div>
    <GoogleLogin :callback="callback" />
    <h2>Hello, {{ email }}!</h2>
  </div>
</template>

<script>
import { decodeCredential } from "vue3-google-login";
import VueCookies from "vue-cookies";

export default {

  data() {
    return {
      userdata: undefined,
      email: "",
      token: "",
    };
  },
  methods: {
    callback(response) {
      this.userdata = decodeCredential(response.credential);
      
      this.email = this.userdata.email;
      this.token = response.credential;
      VueCookies.set("token", this.token);
    },
  },
};
</script>
