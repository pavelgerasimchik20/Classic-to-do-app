<template>
  <h1>Hello {{ email }}</h1>
</template>

<script>
import VueCookies from "vue-cookies";
import { decodeCredential } from "vue3-google-login";
export default {
  data() {
    return {
      email: decodeCredential(VueCookies.get("token")).email,
    };
  },
};
</script>
