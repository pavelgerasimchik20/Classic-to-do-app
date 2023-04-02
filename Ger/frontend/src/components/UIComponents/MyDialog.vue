<template>
    <div class="dialog" v-if="show" @click="hide">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
  
<script>
  export default {
    name: 'MyDialog',
    props: {
        show: {
            type: Boolean,
            default: false
     }
    },
    methods: {
        hide() {
            this.$emit('update:show', false)
        }
    }
  }
</script>
  
<style scoped>
.dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
}

.content {
    margin: auto;
    background: white;
    border-radius: 10px;
    min-height: 60px;
    min-width: 300px;
}
</style>