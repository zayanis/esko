<template>
    <div>
		
        <transition name="fade" mode="out-in" appear>
            <keep-alive>
                <app-accueil></app-accueil>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import accueil from './components/Dashboard.vue'


export default {
    components: {
        'app-accueil': accueil,
	
        
    },
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
