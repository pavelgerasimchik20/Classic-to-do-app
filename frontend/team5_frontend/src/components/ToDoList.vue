<!-- eslint-disable vue/require-v-for-key -->
<template>
    <div class="todo" v-for="todo in result ">
      <div>to do: {{ todo.todos }}</div>
    </div>
</template>

<script >
export default {
    props: {
        result: {}
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
  