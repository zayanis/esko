<template>
    <div>
        <div class="ui  container">
		<div class="ui secondary pointing menu">
				  <a class="item">
					  <router-link to="/annonces" class="item" active-class="active">
                            Annonces
                        </router-link>
				  </a>
				  <a class="item">
					   <router-link to="/statistiques" class="item" active-class="active">
                            Statistiques
                        </router-link>
				  </a>
				  <a class="item">
					      <router-link to="/profile" class="item" active-class="active">
                            Profile
                        </router-link>
				  </a>
				  <a class="item">
					      <router-link to="/parrainage" class="item" active-class="active">
                            Parrainage
                        </router-link>
				  </a>
				 <a class="right item" @click="onLogoutClicked">
				 <router-link to="/" class="item" >
                      Logout
                        </router-link>
						</a>
		
	
		
		</div>
		
		
           
    </div>
	

	   </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';

export default {

data() {
        return {
          isAuthenticated: false
        }
    },
	 beforeCreate: function (){
	
	 },
    mounted() {

	
	if (this.$session.exists()) {
		this.isAuthenticated = true;
	  }
	  		this.$forceUpdate();
    },
	 
    methods: {
        onLogoutClicked() {
			this.$session.destroy();
			localStorage.removeItem('authToken');
            this.$store.commit('setisAuthenticated', false);
	
			
        }
    }
}
</script>
