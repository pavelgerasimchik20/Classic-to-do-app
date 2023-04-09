<template>
    <v-select
        v-model="selectedType"
        class="w-1/4"
        clearable
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
            types: ['','by text', 'by date(old above)', 'by date(new above)'],
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