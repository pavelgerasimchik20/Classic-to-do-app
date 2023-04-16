<template>
    <v-hover
        v-slot="{ isHovering, props }"
        >
        <v-btn 
            icon="mdi-pencil" 
            :class="{ 'on-hover': isHovering }"
            v-bind="props"
            @click="$emit('edit-task')"
        ></v-btn>
    </v-hover>
</template>

<script>
export default {
    emits: ['edit-task']
};

</script>


