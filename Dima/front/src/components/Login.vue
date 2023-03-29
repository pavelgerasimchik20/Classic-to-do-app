<template>
    <p>Login</p>
    <GoogleLogin :callback="callback"/>
    <h3>User email: {{ email }}</h3>
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
            localStorage.setItem("key", JSON.stringify(response.credential))
            this.userData = decodeCredential(response.credential);
            this.email = this.userData.email;
            console.log(this.userData);
        }
    }
}
</script>
