<template>
  <div>
    <GoogleLogin :callback="callback" />
  </div>
</template>

<script>
import { decodeCredential } from "vue3-google-login";
import VueCookies from "vue-cookies";

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
      VueCookies.set("token", this.token);
    },
  },
};
</script>
