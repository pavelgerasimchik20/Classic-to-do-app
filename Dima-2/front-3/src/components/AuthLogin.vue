<template>
    <v-sheet width="300" class="mx-auto my-5">
        <div v-if="!email">
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
                    )
                </h3>
            </div>
        </div>
    </v-sheet>
</template>

<script>

export default {
    data: () => ({
            email: ""
    }),

    methods: { 
        callback(response) {
            localStorage.setItem("token", response.credential);
        },

        clearEmail() {
            localStorage.removeItem("email");
            location.reload();
        }
    },

    mounted() {
        this.email = localStorage.getItem("email");
    }
}

</script>
