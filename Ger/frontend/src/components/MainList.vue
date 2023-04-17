<template>
  <v-row class="mt-4" v-if="allTodos.length > 0">
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
