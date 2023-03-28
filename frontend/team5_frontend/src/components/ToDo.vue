<template>
    <div>
        <ul>
            <li v-for="todo in todos" :key="todo._id">{{ todo.todos }}</li>
        </ul>
    </div>
    <button @onclik="deleteTask">Done</button>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                todos: [],
            };
        },
        methods: {
            deleteTask(task) {
                const index = this.items.indexOf(task);
                if (index > -1) {
                    this.todos.splice(index, 1);
                }
            }
        },
        mounted() {
            axios.get('http://localhost:6060/get-todos')
            .then(response => {
                this.todos = response.data;
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        },
    };
</script>