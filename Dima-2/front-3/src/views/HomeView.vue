<template>
    <v-sheet width="70vw" class="mx-auto my-5">
        <AuthLogOut />
        <AddTask />
        <TaskList />
    </v-sheet>
</template>

<script>
import AddTask from '../components/AddTask.vue'
import TaskList from '../components/TaskList.vue'
import AuthLogOut from '../components/AuthLogOut.vue'


export default {
    components: {
        AddTask,
        TaskList,
        AuthLogOut
    },
}
</script>
