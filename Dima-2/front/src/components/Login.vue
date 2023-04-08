<template>

    <div v-if="!isResult">
        <p> SignIn to see you todo:</p>
        <GoogleLogin :callback="callback" />
    </div>

    <div v-else>
        <div class="my-7">
            <h3>Hi {{ email }} ( 
                <v-btn 
                    size="x-small" 
                    @click="clearEmail"
                    >log out
                </v-btn> 
                ):
            </h3>
        </div>
    </div>
</template>

<script>

export default {
    emits: ['response'],

    data() {
        return {
            isResult: false,
            email: ""
        }
    },

    methods: {
        callback(response) {
            localStorage.setItem("token", response.credential);
            this.fetchTasks();
        },

        clearEmail() {
            localStorage.removeItem("email");
            location.reload();
        }
    },

    mounted() {
        this.email = localStorage.getItem("email");
        this.fetchTasks();
    }
}

</script>
