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
import state from '../store/index' 

export default {

methods: {
    async fetchTasks(){
        state.dispatch('fetchTasks')
    }
},

computed: {
    tasks(){
        return state.getters.allTasks
    }
},

mounted() {
    state.dispatch('fetchTasks')
}

}
</script>
