<template>
<div>



<br></br><br></br><br></br><br></br><br></br>


<div class="ui two column centered grid">
  <div class="column">   <div class="ui segment">
     		<h2 class="ui blue header"> 
				<div class="content">ESKO</div>
			</h2>
    </div>
	</div>
	
	
  <div class="four column centered row">
    <div class="column">   <div class="ui segment">
	<h3 class="ui blue header"> 
				<div class="content">Passez des annonces gratuites et sans commission.</div>
			</h3>
  
	 
    </div></div>
    <div class="column">   <div class="ui segment">
       <div class="ui form">
                        <div class="field">
                            <label for="username">E-mail:</label>
                            <div class="ui icon input">
                                <input type="email" placeholder="Username" name="E-mail" id="username" v-model="username"/> <i class="user icon"></i>

                            </div>
                        </div>
                        <div class="field">
                            <label for="password">Mot de passe:</label>
                            <div class="ui icon input">
                                <input type="password" placeholder="Mot de passe" name="password" id="password" v-model="password"/> <i class="lock icon"></i>

                            </div>
                        </div>
                      
						
						   <div class="ui negative message" v-if="error !== null">
							<p>{{ error }}</p>
							</div>
                    </div>
					<br></br>
				    <button   @click="onLoginButtonClick" class="ui primary button middle" > Se loguer </button>
    </div></div>
  </div>

</div>


<div class="ui active inverted dimmer" v-if="loader" ><div class="ui text loader"></div></div>


</div>


</template>

<script>
import lodashStartCase from 'lodash/startCase';
import { mapGetters, mapMutations } from 'vuex';

export default {

    data() {
        return {
            error: null,
            username: null,
			loader: false,
            password: null
        }
    },
    computed: {
        ...mapGetters({
		  isAuthenticated: 'getisAuthenticated'
        })
    },
	

    methods: {
        onLoginButtonClick() {
		this.error= null;
				
					if( this.username == null || this.username == "" ){
					this.error= 'Champs e-mail vide';
					}
					else if( this.password == null || this.password == "" ){
					this.error= "Champs Mot de passe vide";
					}
					else
					{
			
					this.loader= true;
					this.$http.get('rest/inscrits',    {headers: {'x-apikey':'5a50e16e7679b5244b6632d4'}, params:  {'q': `{"mail":"${username.value}", "password": "${password.value}"}`}})
					.then(response => {
					//var body = response.body.length;
					if(response.body.length == 0 ){
						 this.username = this.password = null;
						 	 this.error = "Adresse e-mail ou mot de passe incorrect";
						this.loader= false;
					}
					else{
						this.$session.start();
						this.$emit('loggedIn', this.username);
						this.$store.state.inscrit = response.body;
						this.loader= false;
						this.error = this.username = this.password = null;
					}
					
					}, error => {
							this.error = error.body;
					});
		
					}
					
					
				
				
        }
    }
}
</script>
