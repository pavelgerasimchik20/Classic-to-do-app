<template>
        <v-list density="compact" nav>
            <v-list-item 
                prepend-icon="mdi-logout"
                title="Log out"
                value="Log out"
                v-on:click="logOut"
                ></v-list-item>
        </v-list>

</template>

<script>
import state from '../store/index'

export default {

    methods: { 
        logOut() {
            state.dispatch('logOut')
            this.$router.push({name: 'login'})
        }
    }
}

</script>
