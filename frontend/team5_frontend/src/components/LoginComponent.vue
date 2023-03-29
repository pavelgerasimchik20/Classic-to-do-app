<template>
  <div class="login">
    <GoogleLogin :callback="callback"/>
    <h3>User email: {{ email }}</h3>
  </div>
</template>

<script>
import { decodeCredential } from 'vue3-google-login';

export default {
  name: 'LoginComponent',
  data() {
    return {
      userData: null,
      email: ''
    }
  },
  methods: {
    callback(response) {
      this.userData = decodeCredential(response.credential);
      this.email = this.userData.email;
      console.log(this.userData.email);
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