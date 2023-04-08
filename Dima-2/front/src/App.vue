<template>

<v-card
    class="mx-auto"
    max-width="448"
    >
    <v-layout>
        <v-app-bar
            color="orange-lighten-3"
            density="compact"
            >
            <v-app-bar-title class="text-h2">Yo yo ToDo</v-app-bar-title>
        </v-app-bar>

        <v-main>
            <v-container fluid>

                <!-- <Login /> -->
                <Todos />
            </v-container>
        </v-main>
    </v-layout>
</v-card>

</template>

<script>
import Todos from "./components/Todos.vue"
import Login from "./components/Login.vue"

export default {
    name: 'App',
    components: {
        Todos,
        Login
    }

}

</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
