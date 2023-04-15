<template>
  <div>
    <h1 v-if="email">Hello {{ email }}</h1>
    <h1 v-else>You need to log in to the system</h1>
  </div>
</template>

<script>
//import VueCookies from "vue-cookies";
import { decodeCredential } from "vue3-google-login";
export default {
  data() {
    return {
      email: decodeCredential(localStorage.getItem("token")).email,
    };
  },
};
</script>
