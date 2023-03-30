<template>
  <div class="login">
    <GoogleLogin :callback="callback"/>
    <h3>Hello, {{ email }}</h3>
    <h6>your token: {{ token }}</h6>
  </div>
</template>

<script>
import { decodeCredential } from 'vue3-google-login';
import VueCookies from 'vue-cookies';

export default {
  name: 'LoginComponent',
  data() {
    return {
      userData: null,
      email: '',
      token: ''
    }
  },
  methods: {
    callback(response) {
      this.$emit('change', this.isLoggedIn);
      this.isLoggedIn = true;
      this.userData = decodeCredential(response.credential);
      this.email = this.userData.email;
      this.token = response.credential;
      console.log(this.userData);
      // savind the token in a cookies
      VueCookies.set('token', this.token);
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>