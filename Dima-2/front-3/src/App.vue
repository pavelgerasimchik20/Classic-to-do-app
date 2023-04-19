<template>
  <v-app>
    <v-toolbar class="bg-amber-lighten-4 ">
        <v-toolbar-title 
            class="text-h2 text-amber-lighten-1 font-weight-black ps-8"
            >yO-yO ToDo
        </v-toolbar-title>

        <nav class="text-h5 pe-8">
            <router-link class="text-black text-decoration-none" to='/'>Home</router-link> | 
            <router-link class="text-black text-decoration-none" to="/about">About</router-link> |
            <router-link class="text-black text-decoration-none" to="/login">Log in</router-link> 
        </nav>

    </v-toolbar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import state from './store/index'

export default {
    name: 'App',

    methods: {
        logout(){
            state.dispatch('logOut')
        }
    },

//   computed: {
//     isLogin(){
//         return state.getters.isLogin
//     }
//   }  //TODO

}
</script>
