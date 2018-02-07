<template>
<div>


	<div class="ui top attached tabular menu">
	  <div class="item">
			<h2 class="ui blue header"> 
				<i class="add user icon"></i>
				<div class="content">Parrainer vos proches</div>
			</h2>
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
								<input type="email" name="email" placeholder="Email" v-validate="'required|email'" v-model="mail">
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
		   error : null,
		   html : 'html',
		   subject : 'Parrainage esko (site d\'annonces)',
		   sendername : 'esko',
		   url : 'https://sad-jackson-f62e92.netlify.com/',
		   password : ''
        }
    },
    methods: {
	
        Envoyer() {
		
		this.$validator.validateAll();
      
      if (this.errors.any()) {
			this.error = "Mail vide ou incorrecte.";
      }
	   if (!this.errors.any()) {
		this.error = null;
		var isExist = 100;
		var user_id='';
		
		 var request = '{"mail":"' + this.mail +'"}';
		
		this.$http.get('rest/inscrits',   {params:  {'q':`${request}` , 'h':'{"$aggregate":["COUNT:"]}'}})
		.then(response => {

          isExist = response.body["COUNT "];	
		  
		  		if(isExist < 1 ){
			
						if( this.mail == null || this.mail == "" ){
						}
						else
							{
							
							
								this.$http.post('rest/inscrits',   {
												mail: this.mail						 
						 })
						 .then(response => {
							user_id = response.body._id;
							var lien = this.url+"#/annonces?inscription=&mail="+this.mail+"&id="+user_id;
							this.html="Un(e) ami(e) vous recommande notre site. Nous sommes un site de d&eacute;p&ocirc;t d\n'annonce pour &eacute;change de devise entre particulier. Pour finaliser votre inscription, veuillez cliquer sur le lien ci dessous:<br>"+lien;
								this.$http.post('mail',   {
												to: this.mail,
												subject: this.subject,
												html: this.html,
												sendername: this.sendername
						 
						 })
						 .then(response => {
							this.error = "Mail envoy&eacute;";	 
							this.mail = null;
						});
							
						});
						
							
						
						}
					}
				
					else{
					this.error = "Mail existe dans notre base";
					}
	
        });
		
		

	}
		  
	},

    }
}
</script>
