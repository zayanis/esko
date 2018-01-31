<template >
	<div class="ui middle aligned center aligned grid internally celled">
				<div class="column">
					<div class="ui center aligned page grid">
						<div class="column">
							<div class="ui left aligned segment">
								<div class="ui form">
								<div class="ui active inverted dimmer" v-if="loader" ><div class="ui text loader"></div></div>
									<div class="field">
										<label>Montant </label>
										<div class="ui icon input">
											<input type="text" v-bind:value=this.selectedDemande.MONTANT disabled /></i>

										</div>
									</div>
									
									<div class="field">
										<label>Devise </label>
										<div class="ui icon input">
											<input type="text" v-bind:value=this.selectedDemande.DEVISE disabled /></i>

										</div>
									</div>
									
									<div class="field">
										<label>Taux </label>
										<div class="ui icon input">
											<input type="text" v-bind:value=this.selectedDemande.TAUX disabled /></i>

										</div>
									</div>
									
									<div class="field">
										<label>Nombre de vue </label>
										<div class="ui icon input">
											<input type="text"  v-bind:value=this.nombre_vue disabled /></i>

										</div>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
</template>

<script>


export default {
  props: ['selectedDemande'],
  data() {
        return {
			loader: false,
			nombre_vue: -1
        }
    },
	mounted() {
	this.loader=true;
	  var demandeId= this.selectedDemande._id;
		var request = '{"Demande._id":"'+demandeId+'"}';
			 this.$http.get('rest/statistiques',    {params:  {'q':`${request}` , 'h':'{"$aggregate":["COUNT:"]}'}})
		.then(response => {
           this.nombre_vue= response.body["COUNT "];
		   
        });
		
	 },
	 watch: {
		 nombre_vue (nombre) {
		 this.loader=false;
		 }
	 }
	 }

</script>
