<template>
	   <div>
        <transition name="fade" mode="out-in" appear>
            <keep-alive>
                <app-login v-if="!isAuthenticated" @loggedIn="onSuccessfulLogin"></app-login>
                <app-dashboard></app-dashboard>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import dashboard from './components/Dashboard.vue';
import login from './components/Login.vue';


export default {
    components: {
        'app-dashboard': dashboard,
		'app-login': login
 
    },
data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters({
		isAuthenticated: 'getisAuthenticated'
        })
    },
    methods: {
	        onSuccessfulLogin(authToken) {
            localStorage.setItem('authToken', authToken);
           this.$store.commit('setisAuthenticated', true);
        }
    },
    created() {
	
	if( this.$session.exists()){
	      const authToken = localStorage.getItem('authToken');

        if (authToken !== null) {
            this.onSuccessfulLogin(authToken);
        }
	}
	else{
					localStorage.removeItem('authToken');
            this.$store.commit('setisAuthenticated', false);
	}
     
    }
}
</script>
