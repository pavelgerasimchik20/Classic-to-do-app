<template>
  <v-row class="mt-4" v-if="allTodos.length > 0">
    <TransitionGroup name="list">
      <v-col v-for="(todo, index) in allTodos" :key="index" cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-card-text class="text-teal font-weight-medium">{{ todo.text }}</v-card-text>
          <v-card-actions>
            <div class="pa-0 text-center">
              <v-btn class="text-none" color="teal" elevation="2" @click="showDialog(todo)">
                Edit
              </v-btn>
              <v-btn class="text-none" color="teal" elevation="2" @click="remove(todo._id)">
                Done
              </v-btn>
              <v-label class="text-teal font-weight-light mt-3 mx-4">
                <small>{{ todo.createDate }}</small>
              </v-label>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </TransitionGroup >
  </v-row>
</template>

<script>
export default {
  props: {
    allTodos: {
        type: Array,
        required: true
    },
  },
  methods: {
    showDialog(todo) {
      this.$emit("showDialog", todo);
    },
    remove(id) {
      this.$emit("remove", id);
    },
  },
};
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
