<template >
	<div class="ui middle aligned center aligned grid">
				<div class="column">
					<div class="ui center aligned page grid">
						<div class="column">
							<div class="ui left aligned segment">
								<div class="ui form">
									<div class="field">
										<label for="mail">E-mail:</label>
										<div class="ui icon input">
											<input type="text" placeholder="mail" name="E-mail" id="mail" v-bind:value=this.selectedDemande.user[0].mail disabled /> <i class="mail icon"></i>

										</div>
									</div>
									<div class="field">
										<label for="telephone">Tel:</label>
										<div class="ui icon input">
											<input type="text" placeholder="Mot de passe" name="telephone" id="telephone"  v-bind:value=this.selectedDemande.user[0].telephone disabled /> <i class="call icon"></i>

										</div>
									</div>
									  <div class="field">
										<label for="adresse">Adresse:</label>
										<div class="ui icon input">
											<input type="text"   name="adresse" id="adresse"  v-bind:value=this.selectedDemande.user[0].adresse disabled /> <i class="location arrow icon"></i>

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
	
}
</script>
