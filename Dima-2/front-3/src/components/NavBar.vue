<template>

      <v-navigation-drawer
        class="bg-amber-lighten-4"
        theme="light"
        permanent
      >
        <v-list color="transparent">
          <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard"></v-list-item>
          <v-list-item prepend-icon="mdi-account-box" title="Account"></v-list-item>
          <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>
        </v-list>

        <template v-if="isLogin" v-slot:append>
          <div class="pa-2">
            <AuthLogOut />
          </div>
        </template>
      </v-navigation-drawer>


        <!-- <nav class="text-h5 pe-8">
            <router-link class="text-black text-decoration-none" to='/'>Home</router-link> | 
            <router-link class="text-black text-decoration-none" to="/about">About</router-link> |
            <router-link class="text-black text-decoration-none" to="/login">Log in</router-link> 
        </nav> -->
</template>

<script>
import state from '../store/index' 
import AuthLogOut from '../components/AuthLogOut.vue'

export default {
    components: {
        AuthLogOut
    },

    computed: {
        isLogin(){
            return state.getters.isAuth
        }
    }
}
</script>
