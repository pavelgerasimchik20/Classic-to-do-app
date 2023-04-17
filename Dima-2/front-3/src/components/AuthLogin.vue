<template>
    <v-sheet width="300" class="mx-auto my-5">
        <div v-if="!isAuth">
            <p> SignIn to see you todo:</p>
            <GoogleLogin :callback="callback" />
        </div>
        <div v-else>
            <div class="my-7">
                <h3>Hi {{ email }} ( 
                    <v-btn 
                        size="x-small" 
                        @click="logOut"
                        >log out
                    </v-btn> 
                    )
                </h3>
            </div>
        </div>
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
