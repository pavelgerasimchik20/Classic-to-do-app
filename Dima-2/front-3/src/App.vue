<template>
  <v-app>
    <v-toolbar dark>
        <v-toolbar-title class="text-h2 font-weight-black">yO-yO ToDo</v-toolbar-title>
        <router-link to="/">Home</router-link> | 
        <router-link to="/about">About</router-link>
        <router-link to="/auth">About</router-link>
    </v-toolbar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
