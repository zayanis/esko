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


   
	 <table class="ui red table sortable">
	  <thead>
		<tr>
			<th>De</th>
			<th>Vers</th>
			<th>Date</th>
			<th>Consulter</th>
			<th>Supprimer</th>
		</tr>
	  </thead>
	  
		<tbody>
	  
		   <tr v-if="demandes.length > 0" v-for="demande in demandes">
						   
							<td>{{ demande.FROM }}</td>
							<td>{{ demande.DEST }}</td>
							<td>{{ demande.DATE | formatDate }} </td>
							<td class="selectable"><a href="#/statistiques" @click="onDetailDemande(demande)"><i class="unhide icon"></i></a></td>
							<td class="selectable"><a href="#/statistiques" @click="supprimer(demande)"><i class="remove icon"></i></a></td>
							
			</tr>
		</tbody>
		<tfoot>
			<tr>
				<th><div class="ui red basic label" v-if="demandes.length < 1">Aucune demande trouvée</div></th>
				<th colspan="7"></th>
			</tr>
		</tfoot>
	</table>
	

		<modal name="detail" height="auto" :scrollable="true"  :draggable = "true">
		<app-detail-demande :selectedDemande="this.selectedDemande"></app-detail-demande>
	</modal>
	
	
	
		<div class="ui active inverted dimmer" v-if="loader" ><div class="ui text loader"></div></div>
	</div>
	
</template>



<script>
import { mapGetters } from 'vuex';
import Detail from './Statistique/Detail_stat.vue';
import moment from 'moment';

export default {
components: {
		   'app-detail-demande': Detail 
		   
    },
  data() {
        return {

			loader: false,
			
			selectedDemande: null
            
        }
    },
    computed: {
        ...mapGetters({
             demandes: 'getAllDemandes'
        })
    },
    methods: {
	
	onDetailDemande(demande) {
		this.selectedDemande= demande;
		  this.$modal.show('detail');
		  
	},
		supprimer(demande) {
		
		this.selectedDemande= demande;
		
		
		
		this.$http.put('https://eskodb-f2a5.restdb.io/rest/demandes/'+this.selectedDemande._id,   {
									ACTIVE: false
			 
			 })
			 .then(response => {
			 
			 this.loader= true;

			var username= localStorage.getItem('authToken');
			var request = '{"user.mail":"' +username+'","ACTIVE": true}';
			this.$store.dispatch('requestDemandesByPays',request);
			 
            });
			
		//this.$modal.show('detail');
		  
	}
       
    },
    created() {
					this.loader= true;

			var username= localStorage.getItem('authToken');
			var request = '{"user.mail":"' +username+'","ACTIVE": true}';
			this.$store.dispatch('requestDemandesByPays',request);
    },
	watch: {
	demandes (demandes){
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
