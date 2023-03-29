<!-- eslint-disable vue/require-v-for-key -->
<template>
    <div class="todo" v-for="todo in result ">
      <!-- <div> № {{ todo.id }}</div>
      <div>create date: {{ todo.createDate }}</div> -->
      <div>to do: {{ todo[0].todos }}</div>
    </div>
</template>

<script >
export default {
    props: {
        result: {
            type: Object,
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
  