<template>
    <div>
	<br></br><br></br><br></br><br></br>
        <div class="ui  container">
  <div class="ui mini secondary pointing menu">
				  <a class="item">
					  <router-link to="/aide" class="item" active-class="active">
                            Comment ça marche
                        </router-link>
				  </a>
				  <a class="item">
					   <router-link to="/contact" class="item" active-class="active">
                            Nous contacter
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
