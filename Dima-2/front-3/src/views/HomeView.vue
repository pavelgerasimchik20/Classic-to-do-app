<template>
    <v-sheet width="70vw" class="mx-auto my-5">
        <AddTask />
        <TaskList />
    </v-sheet>
</template>

<script>
import AddTask from '../components/AddTask.vue'
import TaskList from '../components/TaskList.vue'


export default {
    components: {
        AddTask,
        TaskList
    },
}
</script>
