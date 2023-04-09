<template>
  <div class="login">
    <GoogleLogin :callback="callback"/>
    <div class="under_login">
      <h4 style="margin-top: 50px">Hello, {{ email }}</h4>
    </div>
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
      email: decodeCredential(VueCookies.get('token')).email,
      token: '',
    }
  },
  methods: {
    callback(response) {
      this.userData = decodeCredential(response.credential);
      this.email = this.userData.email;
      this.token = response.credential;
      console.log(this.userData);
      // saving the token in a cookies
      VueCookies.set('token', this.token);
    }
  }
}
</script>