<template>
  <v-app>
    <v-toolbar dark>
        <v-toolbar-title>yO yO ToDO</v-toolbar-title>
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
