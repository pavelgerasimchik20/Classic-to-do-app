<template>
    <form @submit.prevent>
        <h4>Add your todo</h4>
        <input
            v-model="todo.todo"
            class="input"
            type="text"
            placeholder="what do you need to do ?"
        >
        <button
            class="btn"
            @click="addToDo"
        >
            Add todo
        </button>
    </form>
</template>
  
<script >
export default {
    data() {
        return {
            todo: {
                todo: ''
            }
        }
    },
    methods: {
        addToDo() {
            this.todo.id = Date.now();
            this.todo.createDate = new Date().toLocaleString();
            this.$emit('add', this.todo);
            this.post = {
                todo: ''
            }
        }
    }
}
</script>
  
  
<style >
.input {
    width: 100%;
    border: 1px solid skyblue;
    padding: 10 px 15 px;
    margin-top: 10px;
}
.btn {
    margin-top: 10px;
    align-self: flex-end;
    padding: 10px 10px;
    background: none;
    color: skyblue;
    border: 1px solid skyblue;
    border-radius: 15%;
}
form {
    display: flex;
    flex-direction: column;
}
</style>
  