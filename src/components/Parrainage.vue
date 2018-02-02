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
                                <!-- input type="email" placeholder="mail" v-model="mail" /> <i class="mail icon"></i -->
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
		   subject : 'subject',
		   sendername : 'sendername',
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
							
							this.html=user_id;
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
	generate (){
      let CharacterSet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      this.password = '';
	  for(let i=0; i < 8; i++) {
        this.password += CharacterSet.charAt(Math.floor(Math.random() * CharacterSet.length));
      }
	  
	}
    }
}
</script>
