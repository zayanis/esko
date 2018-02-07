<template>
<div>


	<div class="ui top attached tabular menu">
	  <div class="item">
			<h2 class="ui blue header"> 
				<i class="plug icon"></i>
				<div class="content">contact</div>
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
								<input type="email" name="email" placeholder="Email"v-model="mail" disabled >
                            </div>
                        </div>
						<div class="field">
                            <label for="mail">Message:</label>
                            <div class="ui icon input">
                                
					
							  <textarea name="message" rows="10" cols="30" v-model="message"></textarea>
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
		   mail_support : 'zayanis@gmail.com',
		   message : '',
		   error : null,
		   subject : 'Contact / Questions ',
		     sendername : 'esko'
		
        }
    },
	 created() {

		  this.mail= localStorage.getItem('authToken');
    },
	
    methods: {
	
        Envoyer() {
		


		this.error = null;
		

          
						if( this.message == null || this.message == "" ){
						this.error = "Message vide.";
						}
						else
							{
							var html = "Message de : " +this.mail + "<br>" + this.message;
							this.$http.post('mail',   {
												to: this.mail_support,
												subject: this.subject,
												html: html,
												sendername: this.sendername
						 
						 })
						 .then(response => {
							this.error = "Message envoy&eacute;";	 
							this.message = null;
						});
						}
		

	}
		  
	}

}
</script>
