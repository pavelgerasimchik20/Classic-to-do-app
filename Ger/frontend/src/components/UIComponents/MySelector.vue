<template>
    <v-select
        class="w-1/4"
        clearable
        chips
        label="sort by"
        :items="sortOptions"
        multiple
    >
    </v-select>
</template>

<script>
export default {
    name: 'MySelector',
    data(){
        return {
            sortOptions: [
            'sort by text', 'sort by create date'
        ]
        }
    },
}
</script>