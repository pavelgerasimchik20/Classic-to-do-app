<template>
    <v-hover
        v-slot="{ isHovering, props }"
        >
        <v-btn 
            icon="mdi-delete-outline" 
            :class="{ 'on-hover': isHovering }"
            v-bind="props"
            @click="$emit('delete-task')"
        ></v-btn>
    </v-hover>
</template>

<script>
export default {
    emits: ['delete-task']
};

</script>


