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

	<div class="ui secondary  menu" >

		<div class="item">
			<semantic-ui-dropdown
								:selection="true"
								:fluid="true"
								text="De"
								:items="pays"
								v-model="paysfrom"
			></semantic-ui-dropdown>
		</div>
						
	   <div class="item">

			<semantic-ui-dropdown
								:selection="true"
								:fluid="true"
								text="Vers"
								:items="pays"
								v-model="paysdest"
						></semantic-ui-dropdown>

			</div>		
			
	  <div class="right menu">
		<div class="item">
		  <div>
			<button v-on:click="rechercher();" class="ui primary button">Rechercher</button>
			</div>  
		</div>
	  </div>
	</div>
   
	 <table class="ui red table sortable">
	  <thead>
		<tr>
			<th>De</th>
			<th>Vers</th>
			<th>Date</th>
			<th></th>
		</tr>
	  </thead>
	  
		<tbody>
	  
		   <tr v-if="demandes.length > 0" v-for="demande in demandes">
						   
							<td>{{ demande.FROM }}</td>
							<td>{{ demande.DEST }}</td>
							<td>{{ demande.DATE | formatDate }} </td>
							<td class="selectable"><a href="#/annonces" @click="onDetailUser(demande)"><i class="unhide icon"></i></a></td>
							
			</tr>
		</tbody>
		<tfoot>
			<tr>
				<th><div class="ui red basic label" v-if="demandes.length < 1">Aucune demande trouvée</div></th>
				<th colspan="7"></th>
			</tr>
		</tfoot>
	</table>

  
	<div class="ui right floated ">
		<button v-on:click="afficherAjoutDemande();" class="ui right primary button">Ajouter une demande</button>
	</div>

	<modal name="detail" :width="auto" :height="auto" :scrollable="true"  :draggable = "true">
		<app-detail-inscrit :selectedDemande="this.selectedDemande"></app-detail-inscrit>
	</modal>
  
	  
	<modal name="ajout" :width="800"  :height="300"  :scrollable="true" :draggable = "true">
		<app-ajout-demande></app-ajout-demande>
    </modal>
	
	<div class="ui active inverted dimmer" v-if="loader" ><div class="ui text loader"></div></div>
	
</div>


</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { Dropdown } from 'semantic-ui-vue2';
import moment from 'moment';

import Detail from './Annonces/Detail.vue';
import Ajout from './Annonces/Ajout.vue';
export default {
components: {
        'semantic-ui-dropdown': Dropdown,
		   'app-detail-inscrit': Detail, 
		   'app-ajout-demande': Ajout
    },
data() {
        return {

			paysfrom :'',
			paysdest :'',
			loader: false,
            selectedDemande: null,
			demandes: []
        }
    },
    computed: {
        ...mapGetters({
		  pays: 'getPays',
		   inscrit: 'getInscrit'
        })
    },
	mounted() {
			this.loader= false;
			this.$store.dispatch('requestPays');
	
    },

  beforeRouteUpdate(to) {
		 this.loader= false;
		 this.demandes=null;
	},
	 created() {
	
      if( this.inscrit == null || this.inscrit == "" ){
	  var username= localStorage.getItem('authToken');
	  var request = '{"mail":"' +username +'"}';
	  			this.$store.dispatch('requestInscrit',request);
		
	  }
    },
    methods: {			
        rechercher() {
	
		
			if(this.paysfrom &&  this.paysdest ){
				this.loader= true;
			var request = '{"FROM":"' +this.paysfrom+ '", "DEST": "' + this.paysdest +'", "ACTIVE":true}';
			           //this.$store.dispatch('requestDemandesByPays',request);
			this.$http.get('https://eskodb-f2a5.restdb.io/rest/demandes',    {params:  {'q':`${request}`}})
			.then(response => {
					//commit('setAllDemandes', response.body);
					this.demandes = response.body;
				});
			}
        }, 
		onDetailUser(demande) {
			    this.$modal.show('detail');
				this.selectedDemande=demande;
				
				
							 this.$http.post('https://eskodb-f2a5.restdb.io/rest/statistiques',   {
									Demande: this.selectedDemande,
									user: this.inscrit
			 
			 })
			 .then(response => {
            });
				
		
        },
		afficherAjoutDemande() {
            this.$modal.show('ajout');
        },
		
    },
	watch: {
        paysfrom(pays) {
		 this.paysfrom=pays;
        },
		 paysdest(pays) {
			this.paysdest=pays;
        },
		 demandes(demandes) {
		 this.demandes= demandes;
			this.loader= false;
        }
		
    },
	
	filters: {
		formatDate: function (value) {
				return moment(String(value)).format('DD/MM/YYYY');
	  }
}
	

}
</script>