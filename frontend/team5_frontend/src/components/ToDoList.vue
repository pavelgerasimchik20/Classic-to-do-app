<!-- eslint-disable vue/require-v-for-key -->
<template>
    <div class="todo" v-for="todo in todos">
      <div> № {{ todo.id }}</div>
      <div>create date: {{ todo.createDate }}</div>
      <div>to do: {{ todo.todo }}</div>
    </div>
</template>

<script >
export default {
    props: {
        todos: {
            type: Array,
            required: true
        }
    }
}
 
</script>


<style scoped>
  .todo {
      padding: 30px;
      border: 1px solid skyblue;
      margin-top: 10px;
  }
</style>
  