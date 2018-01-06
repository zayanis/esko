<template>
    <div class="row">
        <div class="four wide column">
            <h1>taux</h1>
        </div>
  
    </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
  
    computed: {
        ...mapGetters({
            isAuthenticated: 'getIsAuthenticated',
            isLoading: 'getIsLoading'
        })
    },
    methods: {
        onSuccessfulLogin(authToken) {
            localStorage.setItem('authToken', authToken);
            this.$store.commit('setIsAuthenticated', true);
        }
    },
    created() {
        const authToken = localStorage.getItem('authToken');

        if (authToken !== null) {
            this.onSuccessfulLogin(authToken);
        }
    }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity .4s !important;
}
.fade-enter, .fade-leave-to {
    opacity: 0 !important;
}
#login {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.modal {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
}
</style>
