<template>
    <v-hover
        v-slot="{ isHovering, props }"
        >
        <v-btn 
            icon="mdi-content-save-outline" 
            color="grey-darken-2"
            :class="{ 'on-hover': isHovering }"
            v-bind="props"
            @click="$emit('save-task')"
        ></v-btn>
    </v-hover>
</template>

<script>
export default {
    emits: ['save-task']
};

</script>


