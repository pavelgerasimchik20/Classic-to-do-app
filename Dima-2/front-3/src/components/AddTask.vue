<template>
    <v-sheet width="300" class="mx-auto my-5">
        <v-form>
            <v-text-field 
                v-model="newTask" 
                @change="newTaskValue"
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
    methods: {
        newTaskValue(e){
            state.dispatch('newTaskValue', e.target.value)
        },
        addTask(){
            state.dispatch('addTask')
            state.dispatch('clearNewTaskField')
        }
    },
    computed: {
        newTask() {
            return state.getters.newTask
        }
    }
}
</script>
