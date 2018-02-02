<template>
	   <div>
        <transition name="fade" mode="out-in" appear>
            <keep-alive>
               
				 <app-inscription v-if="inscription" @loggedIn="onSuccessfulInscription"></app-inscription>
				  <app-login v-if="!isAuthenticated" @loggedIn="onSuccessfulLogin"></app-login>
                <app-dashboard v-if="isAuthenticated"></app-dashboard>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import dashboard from './components/Dashboard.vue';
import login from './components/Login.vue';
import inscription from './components/Inscription.vue';


export default {
    components: {
        'app-dashboard': dashboard,
		 'app-inscription': inscription,
		'app-login': login
 
    },
data() {
        return {
            inscription : false
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
        },
		onSuccessfulInscription(authToken) {
            localStorage.setItem('authToken', authToken);
           this.$store.commit('setisAuthenticated', true);
        },
		    fetchData () {
				console.log('fetch: '+this.$route.query.inscription);
				//?inscription=ok&mail=az@az.com
				var param = this.$route.query.inscription;
					if( param == null || param == "" ){
					this.inscription = false;
					}
					else{
					this.inscription = true;
					}
					

					
			}
			
    },

    created() {
	
	this.fetchData();
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
     
    },
	 watch: {
    
		'$route': 'fetchData'
  },
}
</script>
