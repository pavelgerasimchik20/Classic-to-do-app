<template>
    <v-sheet width="70vw" class="mx-auto my-5">
        <AuthLogin />
        <AddTask />
        <TaskList />
    </v-sheet>
</template>

<script>
import AuthLogin from '../components/AuthLogin.vue'
import AddTask from '../components/AddTask.vue'
import TaskList from '../components/TaskList.vue'

export default {
    components: {
        AddTask,
        TaskList,
        AuthLogin
    }
}
</script>
