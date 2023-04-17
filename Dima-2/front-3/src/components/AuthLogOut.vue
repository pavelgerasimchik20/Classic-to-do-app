<template>
    <v-sheet width="100" class="mx-auto my-5">
        <UniversalBTN @event="logOut" title="Log Out"/>
    </v-sheet>
</template>

<script>
import state from '../store/index'
import UniversalBTN from './Buttons/UniversalBTN.vue' 

export default {
    components: {
        UniversalBTN
    },

    methods: { 

        logOut() {
            state.dispatch('logOut')
        }
    }
}

</script>
