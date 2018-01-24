<template>
<div>

<br></br><br></br><br></br><br></br><br></br>
<div class="ui middle aligned center aligned grid">

    <div class="column">
        <div class="ui center aligned page grid">
            <div class="column">
                <div class="ui left aligned segment">
               

                    <div class="ui form">
                        <div class="field">
                            <label for="username">E-mail:</label>
                            <div class="ui icon input">
                                <input type="text" placeholder="Username" name="E-mail" id="username" v-model="username"/> <i class="user icon"></i>

                            </div>
                        </div>
                        <div class="field">
                            <label for="password">Mot de passe:</label>
                            <div class="ui icon input">
                                <input type="password" placeholder="Mot de passe" name="password" id="password" v-model="password"/> <i class="lock icon"></i>

                            </div>
                        </div>
                      
						
						   <div class="ui negative message" v-if="error !== null">
								<div class="header">{{ error.type | startCase }}</div>
							<p>{{ error }}</p>
							</div>
                    </div>
					
                </div>
				  <!--  input type="submit" name="submit" @click="onLoginButtonClick" class="ui inverted blue button  middle" / -->
				    <button   @click="onLoginButtonClick" class="ui inverted blue button  middle" > Se loguer </button>
            </div>
        </div>
    </div>
</div>
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
					this.error= "E-mail non renseigné";
					}
					else if( this.password == null || this.password == "" ){
					this.error= "Mot de passe non renseigné";
					}
					else
					{
			
			
					this.$http.get('https://eskodb-f2a5.restdb.io/rest/inscrits',    {headers: {'x-apikey':'5a50e16e7679b5244b6632d4'}, params:  {'q': `{"mail":"${username.value}", "password": "${password.value}"}`}})
					.then(response => {
					var body = response.body.length;
				//	var mail = response.body[0].mail;
					
					if(response.body.length == 0 ){
						 this.username = this.password = null;
						 	 this.error = "Authentification echoué";
						
					}
					else{
						
							 this.$session.start();
						 this.$emit('loggedIn', this.username);
						 var request = '{"mail":"' +this.username+ '", "password": "' + this.password +'"}';
						this.$store.dispatch('requestInscrit',request);
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
