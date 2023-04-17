<template>
    <v-sheet width="300" class="mx-auto my-5">
        <v-form>
            <v-text-field
                v-model="newTaskValue"
                autofocus
                label="New Task"
                @keyup.enter="addTask"
            ></v-text-field>
            <UniversalBTN @event="addTask" title="ADD"/>
        </v-form>
    </v-sheet>
</template>

<script>
import state from '../store/index' 
import UniversalBTN from './Buttons/UniversalBTN.vue' 

export default {
    components: {
        UniversalBTN
    },

    data: () => ({
        newTaskValue: ''
    }),

    methods: {
        async addTask(){
            await state.dispatch('addTask', this.newTaskValue)
            state.dispatch('fetchTasks')
            this.newTaskValue = ''
        }
    }
    
}
</script>
