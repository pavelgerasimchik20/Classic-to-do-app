<template>
    <v-btn 
        block 
        class="mt-2"
        @click="$emit('submit')"
        >{{ title }}
    </v-btn>
</template>

<script>
export default {
    props: ['title'],
    emits: ['submit']
}
</script>


