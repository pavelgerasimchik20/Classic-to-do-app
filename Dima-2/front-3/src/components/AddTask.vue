<template>
    <v-sheet width="300" class="mx-auto my-5">
        <v-form>
            <v-text-field 
                v-model="newTask" 
                @change="newTaskValue"
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

export default {
    methods: {
        newTaskValue(e){
            this.$store.dispatch('newTaskValue', e.target.value)
        },
        addTask(){
            this.$store.dispatch('addTask')
            this.$store.dispatch('clearTask')
        }
    },
    computed: {
        newTask() {
            return this.$store.getters.newTask
        }
    }
}
</script>
