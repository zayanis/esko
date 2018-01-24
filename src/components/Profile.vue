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
                                <input type="text" placeholder="mail" name="E-mail" id="mail" v-bind:value="this.mail" /> <i class="mail icon"></i>

                            </div>
                        </div>
                        <div class="field">
                            <label for="telephone">Tel:</label>
                            <div class="ui icon input">
                                <input type="text" placeholder="Mot de passe" name="telephone" id="telephone"  v-bind:value="this.telephone" /> <i class="call icon"></i>

                            </div>
                        </div>
						
                          <div class="field">
                            <label for="adresse">Adresse:</label>
                            <div class="ui icon input">
                                <input type="text"   name="adresse" id="adresse"  v-bind:value="this.adresse" /> <i class="location arrow icon"></i>

                            </div>
                        </div>
	
                    </div>
					
                </div>
				  <button   class="ui inverted blue button  middle" > Modifier </button>
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
         inscrit: 'getInscrit'
        })
    },
data() {
        return {
           mail :'',
		   telephone: '',
		   adresse: ''
        }
    },
    methods: {
        
    },
    mounted() {
      if( this.inscrit == null || this.inscrit == "" ){
	  var username= localStorage.getItem('authToken');
	  var request = '{"mail":"' +username +'"}';
	  			this.$store.dispatch('requestInscrit',request);
		
		//this.mail = this.inscrit[0].mail;
		//this.telephone = this.inscrit[0].telephone;
		//this.adresse = this.inscrit[0].adresse;
	  }
	  else{
	  this.mail = this.inscrit[0].mail;
		this.telephone = this.inscrit[0].telephone;
	this.adresse = this.inscrit[0].adresse;
	  }
    },
	watch: {
	inscrit(az){
		this.inscrit  = az;
		this.mail = az[0].mail;
		this.telephone = az[0].telephone;
		this.adresse = az[0].adresse;
	}
	}
}
</script>
