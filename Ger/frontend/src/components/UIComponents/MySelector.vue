<template>
    <v-select
        v-model="selectedType"
        class="w-1/4"
        clearable
        chips
        label="sort by"
        :items="types"
        @change="handleTypeChange"
    >
    </v-select>
</template>

<script>
export default {
    name: 'MySelector',
    data(){
        return {
            types: ['sort by text', 'sort by create date'],
            selectedType: null
        }
    },
    methods: {
        handleTypeChange(event) {
            this.$emit('update:selectedType', event.target.value)
        }
  }
}
</script>