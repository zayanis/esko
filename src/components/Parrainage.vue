<template>
<div>

<p><h1>text</h1></p>
<div class="ui top attached tabular menu">
  <div class="item"></div>
</div>
<div class="ui bottom attached tab segment">
  <p></p>
  <p></p>
  <p></p>
</div>
<p></p>

<div class="ui middle aligned center aligned grid">

    <div class="column">
        <div class="ui center aligned page grid">
            <div class="column">
                <div class="ui left aligned segment">
               

                    <div class="ui form">
                        <div class="field">
                            <label for="mail">E-mail:</label>
                            <div class="ui icon input">
                                <input type="text" placeholder="mail" v-model="mail" /> <i class="mail icon"></i>

                            </div>
                        </div>
                
                    </div>
					
                </div>
				  <button  v-on:click="Envoyer();" class="ui primary button  middle" > Envoyer </button>
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
           mail :''
        }
    },
    methods: {
        Envoyer() {
		
		this.$http.post('https://eskodb-f2a5.restdb.io/mail',   {
									to: this.mail,
									subject: "parraignage de test",
									html: "mon html",
									company: "Acme Inc", 
									sendername: "Acme customer support"
			 
			 })
			 .then(response => {
			 
			 
            });
		  
	}
    }
}
</script>
