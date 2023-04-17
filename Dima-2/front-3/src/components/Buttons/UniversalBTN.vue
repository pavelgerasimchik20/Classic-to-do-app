<template>
    <v-btn 
        block 
        class="mt-2"
        @click="$emit('event')"
        >{{ title }}
    </v-btn>
</template>

<script>
export default {
    props: ['title'],
    emits: ['event']
}
</script>


