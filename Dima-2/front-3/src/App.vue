<template>
  <v-app>

    <v-layout>
        <NavBar />
        <v-main style="height: 400px">
            <router-view/>
        </v-main>
    </v-layout>

    <!-- <v-toolbar class="bg-amber-lighten-4 ">
        <v-toolbar-title 
            class="text-h2 text-amber-lighten-1 font-weight-black ps-8"
            >yO-yO ToDo
        </v-toolbar-title>

        <NavBar />

    </v-toolbar> -->
    <!-- <v-main>
    </v-main> -->
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
