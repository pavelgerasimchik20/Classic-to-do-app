<template>

</template>
    
<script>

export default {

    name: 'ToDoList',

    data() {
        return {
            tasks: [] 
        }
    },

    methods: {
        async fetchTasks() {
            axios.post('http://0.0.0.0:6600/get-todos', {email: "9792910@gmail.com"})
            .then(response => {
                this.tasks = response.data.result;
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        }
    },

    mounted() {
        this.fetchTasks()
    },

    // watch: {
    //     tasks() {
    //         this.fetchTasks()
    //     }
    // }
}
</script>