            <template >
			<div>
			  {{ error }}
					     <form class="ui form" >
								  <div class="field">
									<semantic-ui-dropdown
														:selection="true"
														:fluid="true"
														text="De"
														:items="pays"
														v-model="demandeFrom"
									></semantic-ui-dropdown>
								</div>

									
					  <div class="field">

						<semantic-ui-dropdown
											:selection="true"
											:fluid="true"
											text="Vers"
											:items="pays"
											v-model="demandeDest"
									></semantic-ui-dropdown>

					</div>		
						
				  <div class="field">
						<div class="ui input focus">
							<input type="number" placeholder="Montant" v-model="montant">
						</div>
					</div>	
				  <div class="field">
						<div class="ui input focus">
							<input type="number" placeholder="Taux"  v-model="taux">
						</div>
					</div>	
							
						  <div class="field">
								<div class="ui input focus">
									<input type="text" placeholder="Devise" v-bind:value=this.devise disabled>
								</div>
					</div>	

				  <div class="field">
						<div class="ui input focus">
							<input type="date" placeholder="Date" v-model="date">
						</div>
					</div>						
			
					  <div class="field">
						  <div>
							<button v-on:click="ajouterDemande();" class="ui primary button">Ajouter</button>
							</div>  
						</div>
				</form>
</div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import { Dropdown } from 'semantic-ui-vue2';


export default {
components: {
        'semantic-ui-dropdown': Dropdown
    },
data() {
        return {


			demandeDest :'',
			demandeFrom :'',
			montant :0,
			date :'',
			taux: 0,
			devise: '',

			  error: ''
        }
    },
    computed: {
        ...mapGetters({
		  pays: 'getPays',
		  demandes: 'getAllDemandes',
		    inscrit: 'getInscrit'
        })
    },
	mounted() {

			this.$store.dispatch('requestPays');
	
    },
	
	
    methods: {
	 				
		ajouterDemande(){
			
		if( this.demandeFrom == null || this.demandeFrom == "" ){
							this.error="Champs De manquants";
								return false;
						}
						else if( this.demandeDest == null || this.demandeDest == "" ){
							this.error="Champs Vers manquant";
						}
						else if( this.devise == null || this.devise == "" ){
							this.error="Champs devise manquant";
						}
						else if( this.montant == null || this.montant == "" ){
							this.error="Champs motant manquant";
						}
						else if( this.taux == null || this.taux == "" ){
							this.error="Champs taux manquant";
						}
						else if( this.date == null || this.date == "" ){
							this.error="Champs date manquant";
						}
						else{
						this.error="";
	
		
			 this.$http.post('https://eskodb-f2a5.restdb.io/rest/demandes',   {
									FROM: this.demandeFrom,
									DEST: this.demandeDest,
									DEVISE: this.devise,
									MONTANT: this.montant,
									TAUX: this.taux,
									DATE: this.date,
									ACTIVE: true,
									user: this.inscrit
			 
			 })
			 .then(response => {
                this.demandeFrom = '';
                this.demandeDest = '';
				this.devise='',
				this.montant=0;
				this.taux=0;
				this.date='';
				  this.$modal.hide('ajout');
            });
			}	
		},
		
		
    },
	 created() {
      if( this.inscrit == null || this.inscrit == "" ){
	  var username= localStorage.getItem('authToken');
	  var request = '{"mail":"' +username +'"}';
	  			this.$store.dispatch('requestInscrit',request);
		
	  }
    },
	watch: {

		 demandes(demandes) {
			this.loader= false;
        },
		 demandeDest(pays) {
					for (let i in this.pays) {
						if( this.pays[i].value == pays){
								this.devise=this.pays[i].devise;
							}
					}
        }
		
    }	

}
</script>
