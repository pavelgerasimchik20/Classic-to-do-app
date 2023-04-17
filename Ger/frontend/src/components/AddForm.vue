<template>
    <div>
        <v-text-field class="input" style="width: 75%;" label="New To-Do" v-model="text" required></v-text-field>
        <v-btn @click="add" color="teal">Add</v-btn>
    </div>
</template>

<script>
export default {
    data(){
       return{
        text:''
       } 
    },
    methods: {
        add(){
            this.$emit('add', this.text)
            this.text = ''
        }
    }
}
</script>