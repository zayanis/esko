<template>
<div>
	<div class="ui top attached tabular menu">
	  <div class="item">
			<h2 class="ui blue header"> 
				<i class="pie chart   icon"></i>
				<div class="content">Vos Statistiques</div>
			</h2>
		</div>
	</div>


   
	 <table class="ui blue table sortable">
	  <thead>
		<tr>
			<th>Categories</th>
			<th>Taches</th>
			<th>Commentaires</th>
			<th>Status</th>
			<th>Date de MAJ</th>
			<th>A1</th>
			<th>A2</th>
			
		</tr>
	  </thead>
	  
		<tbody>
	  
		   <tr  v-bind:class="note.statutclass" v-if="notes_pagine.length > 0" v-for="note in notes_pagine">
						   
							<!-- td  v-bind:rowspan="note.tachenb">{{ note.categorie}}</td -->
							<td>{{ note.categorie}}</td>
							<td contenteditable>{{ note.tache }}</td>
							<td contenteditable>{{ note.commentaire }}</td>
							<td >{{ note.statut }}</td>
							<td>{{ note.date | formatDate }} </td>
							<td class="selectable"><a href="#/statistiques" @click="onDetailDemande(demande)"><i class="unhide icon"></i></a></td>
							<td class="selectable"><a href="#/statistiques" @click="supprimer(demande)"><i class="remove icon"></i></a></td>
							
			</tr>
		</tbody>
		<tfoot>
			<tr>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
			</tr>
		</tfoot>
	</table>
	
	 <center>
	 
	<div v-if="notes_pagine.length > 1">
	 <paginate
			:page-count="nb_page"
			  :container-class="'ui pagination menu'"
			  :prev-text="'<'"
			  :next-text="'>'"
			  :prev-class ="'item'"
			  :next-class ="'item'"
			  :active-class ="'active item'"
			  :page-class = "'item'"
			  :click-handler="clickCallback"
			  ref="paginate" >
	  </paginate>
		</div>
  </center>
  

		<modal name="detail_stat" height="auto" :scrollable="true"  :draggable = "true">
		<app-detail-demande :selectedDemande="this.selectedDemande"></app-detail-demande>
	</modal>
	
	
	
		<div class="ui active inverted dimmer" v-if="loader" ><div class="ui text loader"></div></div>
	</div>
	
</template>



<script>
import { mapGetters } from 'vuex';
import Detail from './Statistique/Detail_stat.vue';
import moment from 'moment';
import lodash from 'lodash';
import Paginate from 'vuejs-paginate'

export default {
components: {
		   'app-detail-demande': Detail,
			'paginate' : Paginate		   
		   
    },
  data() {
        return {

			loader: false,
			page : 5 ,
			nb_page: 0,
		notes_pagine: 
				[{
					 	categorie:'categorie1',
						tachenb:'3',
						tache:'tache1',
						commentaire: 'commentaire1',
						statut:'O',
						statutclass:'positive',
						date:'01/01/2018',
					},
					{
					 	categorie:'categorie1',
						tachenb:'3',
						tache:'tache1',
						commentaire: 'commentaire2',
						statut:'C',
						date:'01/02/2018',
					},
					{
					 	categorie:'categorie1',
						tachenb:'3',
						tache:'tache2',
						commentaire: 'commentaire1',
						statut:'O',
						date:'01/03/2018',
					},
					{
					 	categorie:'categorie2',
						tachenb:'1',
						tache:'tache1',
						commentaire: 'commentaire1',
						statut:'O',
						date:'01/04/2018',
					}],
  
			selectedDemande: null,
			
            
        }
    },
    computed: {
        ...mapGetters({
             demandes: 'getAllDemandes'
        })
    },
    methods: {
	
	clickCallback: function(pageNum) {
			
			this.loader = true;	
			var j= (pageNum )* this.page ;
			var k = ( pageNum -1 ) * this.page ;
			var i=0;
			var h=0;
			this.demandes_pagine= [];
				for (i = k; i <  j ; i++) {
							if(i< this.demandes.length){
							this.demandes_pagine[h] =  this.demandes[i];
							h++;
							}
							
			}
			this.loader = false;	
			},	
			
	onDetailDemande(demande) {
		this.selectedDemande= demande;
		  this.$modal.show('detail_stat');
		  
	},
		supprimer(demande) {
		
		this.selectedDemande= demande;
		
		
		
		this.$http.put('rest/demandes/'+this.selectedDemande._id,   {
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
    mounted() {
			this.loader= true;
			this.demandes=null;
			var username= localStorage.getItem('authToken');
			var request = '{"user.mail":"' +username+'","ACTIVE": true}';
			this.$store.dispatch('requestDemandesByPays',request);
    },
	watch: {
	demandes (demandes){
			 this.nb_page = this.demandes.length / this.page;
	
		
		 var j=0;
		 var i=0;
	
			if( this.demandes.length > this.page){
			j= this.page;
			}
		else{
				j=this.demandes.length;
			}
		 
		for (i = 0; i <  j; i++) {
						this.demandes_pagine[i] =  this.demandes[i];
								
	}
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
