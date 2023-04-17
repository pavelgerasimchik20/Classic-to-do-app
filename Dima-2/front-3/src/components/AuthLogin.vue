<template>
    <v-sheet width="300" class="mx-auto my-5">
            <p> SignIn to see you todo:</p>
            <GoogleLogin :callback="callback" />
    </v-sheet>
</template>

<script>
import state from '../store/index'

export default {
    methods: { 
        callback(response) {
            state.dispatch('login', response)
        },

        logOut() {
            localStorage.removeItem("token")
            location.reload()
        }
    },

    computed: {
        isAuth() {
            return state.getters.isAuth
        }
    },

    mounted() {
        this.token = localStorage.getItem("token");
    }
}

</script>
