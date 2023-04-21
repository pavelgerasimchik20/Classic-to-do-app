<template>

<v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item
          :prepend-avatar=userPhoto
          :title=userEmail
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item 
                v-for="item in menu" 
                :key=item.id
                :prepend-icon=item.icon
                :title=item.name
                :to="item.path"
                :value=item.name
            ></v-list-item>
        </v-list>
        
            <template v-if="isLogin" v-slot:append>
                    <AuthLogOut />
            </template>

      </v-navigation-drawer>

</template>

<script>
import state from '../store/index' 
import AuthLogOut from '../components/AuthLogOut.vue'

export default {

    data: () => ({
        drawer: true,
        rail: true,
        menu: [
            {id: 1, name: "Home", path: "/", icon: "mdi-view-dashboard"},
            {id: 2, name: "About", path: "/about", icon: "mdi-account-box"},
        ]
    }),

    components: {
        AuthLogOut
    },

    computed: {
        isLogin(){
            return state.getters.isAuth
        },
        userPhoto(){
            return state.getters.userPhoto
        },
        userEmail(){
            return state.getters.userEmail
        }
    }
}
</script>
