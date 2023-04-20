<template>

    <v-navigation-drawer
        theme="dark"
        rail
        permanent
        >
        <v-list color="transparent">
            <v-list-item 
                v-for="item in menu" 
                :key=item.id
                :prepend-icon=item.icon
                :title=item.name
                :to="item.path"
                active-color="yellow"
            ></v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
        class="bg-amber-lighten-4"
        theme="dark"
        permanent
    >

        <v-list color="transparent">
            <v-list-item 
                v-for="item in menu" 
                :key=item.id
                :title=item.name
                :to="item.path"
                active-color="black"
            ></v-list-item>
        </v-list>

        <template v-if="isLogin" v-slot:append>
          <div class="pa-2">
            <AuthLogOut />
          </div>
        </template>
      </v-navigation-drawer>

</template>

<script>
import state from '../store/index' 
import AuthLogOut from '../components/AuthLogOut.vue'

export default {

    data: () => ({
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
        }
    }
}
</script>
