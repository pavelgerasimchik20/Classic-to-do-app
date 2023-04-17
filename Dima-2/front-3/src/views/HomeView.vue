<template>
    <v-sheet width="70vw" class="mx-auto my-5">
        <AuthLogin v-if="!isAuth" />
        <div v-else>
            <AddTask />
            <TaskList />
        </div>
    </v-sheet>
</template>

<script>
import AuthLogin from '../components/AuthLogin.vue'
import AddTask from '../components/AddTask.vue'
import TaskList from '../components/TaskList.vue'
import state from '../store/index'

export default {
    components: {
        AddTask,
        TaskList,
        AuthLogin
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
