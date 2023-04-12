<template>
    <v-sheet width="300" class="mx-auto my-5">
        <v-list lines="one">
            <v-list-item 
                v-for="item in tasks" 
                :key="item.task_id" 
                :title="item.name" 
            ></v-list-item>
        </v-list>
    </v-sheet>
</template>

<script>

export default {
computed: {
    tasks(){
        return this.$store.getters.allTasks
    }
}
}
</script>
