<template>
    <v-sheet width="70vw" class="mx-auto my-5">
        <!-- <AuthLogOut />
        <AddTask />
        <TaskList /> -->

        <nav class="text-h5 pe-8">
            <router-link
                v-for="destination in destinations"
                :key="destination.id"
                :to="destination.slug"
                >
                <v-item class="mx-1">{{ destination.name }}</v-item>
            </router-link>
        </nav>

    </v-sheet>
</template>

<script>
import sourceData from '@/data.json'
// import AddTask from '../components/AddTask.vue'
// import TaskList from '../components/TaskList.vue'
// import AuthLogOut from '../components/AuthLogOut.vue'

import state from '../store/index'

export default {
    data: () => ({
        destinations: sourceData.destinations
    }),

    components: {
        // AddTask,
        // TaskList,
        // AuthLogOut
    },

    computed: {
        isAuth() {
            return state.getters.isAuth
        }
    },

    mounted() {
        state.dispatch('checkToken')
}
}
</script>
