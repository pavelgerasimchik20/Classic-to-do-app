<template>
  <v-app>
    <v-layout>
        <NavBar />
        <v-main style="height: 100vh">
            <router-view/>
        </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue' 

export default {
    name: 'App',

    components: {
        NavBar
    }
}
</script>
