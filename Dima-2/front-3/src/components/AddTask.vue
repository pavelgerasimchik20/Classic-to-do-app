<template>
    <v-sheet width="300" class="mx-auto my-5">
        <v-form>
            <v-text-field 
                v-model="newTaskValue"
                autofocus
                label="New Task"
            ></v-text-field>
            <v-btn 
                block 
                class="mt-2"
                @click="addTask"
            >Submit</v-btn>
        </v-form>
    </v-sheet>
</template>

<script>
import state from '../store/index' 

export default {
    data(){
        return {
            newTaskValue: ""
        }
    },
    methods: {
        // newTaskValue(e){
        //     state.comit('newTaskValue', e.target.value)
        // },
        async addTask(){
            await state.dispatch('addTask', this.newTaskValue)
            // state.dispatch('clearNewTaskField')
            state.dispatch('fetchTasks')
        }
    }
    
}
</script>
