<template>
<div>


	<div class="ui top attached tabular menu">
	  <div class="item">
	  <center>
			<h2 class="ui blue header"> 
				<i class="plug icon"></i>
				<div class="content">INSCRIPTION</div>
			</h2>
			</center>
		</div>
	</div>


<br></br><br></br><br></br>

<div class="ui middle aligned center aligned grid">

    <div class="column">
        <div class="ui center aligned page grid">
            <div class="column">
			  <form class="ui form" @submit.prevent="Envoyer">
                <div class="ui left aligned segment">
               

                    <div class="ui form">
                        <div class="field">
                            <label for="mail">E-mail:</label>
                            <div class="ui icon input">
								<input type="email" name="email" placeholder="Email"v-model="mail" disabled >
                            </div>
                        </div>
						    <div class="field">
                            <label for="mail">T&eacute;l&eacute;phone:</label>
                            <div class="ui icon input">
								<input type="text" name="tel" v-validate="'required|numeric'"  v-model="tel">
                            </div>
                        </div>
						
						<div class="field">
                            <label for="mail">Adresse</label>
                            <div class="ui icon input">
									<input type="text" name="adresse"  v-validate="'required'"  v-model="adresse">
                            </div>
                        </div>
                    </div>
					 <div class="ui negative message" v-if="error !== null"><em v-html="error"></em></div>
					 
                </div>
				
				  <button type="submit" class="ui primary button  middle" > Envoyer </button>
				  
				    </form>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
  
    computed: {

			
        ...mapGetters({
		
        })
    },
data() {
        return {
           mail : '',
		   tel : '',
		   user_id: '',
		   adresse : '',
		   error : null,
		   subject : 'Inscription esko (site d\'annonces)',
		   password : '',
		   sendername : 'esko'
		
        }
    },
	 
	
    methods: {
	
        Envoyer() {
		this.$validator.validateAll();
      
      if (this.errors.any()) {
			this.error = "Champs vide ou incorrecte.";
      }
	   if (!this.errors.any()) {
		this.error = null;
		var passResponse='';

				this.$http.get('rest/inscrits/'+this.user_id).then(response => {
						passResponse = response.body.password;;
			   });
		
			if( passResponse == null || passResponse == "" ){
			
				this.generate();
				this.$http.put('rest/inscrits/'+this.user_id,   {
									mail : this.mail,
									telephone: this.tel,
									adresse: this.adresse,
									password: this.password
									
									
			 
			 })
			 .then(response => {
			 //on envoi un mail avec le mot de passe.
			 
			 var html = "Votre inscription est valid&eacute;e.<br>Voici les informations pour se connecter:<br>mail: "+ this.mail+"<br>"+"mot de passe: "+this.password;
			 
							this.$http.post('mail',   {
												to: this.mail,
												subject: this.subject,
												html: html,
												sendername: this.sendername
						 
						 })
						 .then(response => {
							this.error = "Inscription valid&eacute;e";	
							  this.$router.push('/')
						});
			 		 
            });
		}
		
		else{
			this.error = "Vous avez d&eacute;j&agrave; un compte";	
		}
	}
	},
	generate (){
      let CharacterSet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      this.password = '';
	  for(let i=0; i < 8; i++) {
        this.password += CharacterSet.charAt(Math.floor(Math.random() * CharacterSet.length));
      }
	  
	}
	
		  
	},
	mounted() {

		 //var request = '{"mail":"' + this.mail +'"}';
			this.user_id = this.$route.query.id;
			this.mail= this.$route.query.mail;

    }

}
</script>
