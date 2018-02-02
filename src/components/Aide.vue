<template>
<div>


	<div class="ui top attached tabular menu">
	  <div class="item">
			<h2 class="ui blue header"> 
				<i class="help circle icon"></i>
				<div class="content">Comment &ccedil;a marche</div>
			</h2>
		</div>
	</div>


<br></br><br></br><br></br>
			
					<div class="ui three top attached mini  steps">
						  <a  v-on:click="aller_step1();" class="step" v-bind:class="{ active  : step1 }">
							<i class="search icon"></i>
							<div class="content">
							  <div class="title">Demander</div>
							  <div class="description"></div>
							</div>
						  </a>
						  <a  v-on:click="aller_step2();" class="step" v-bind:class="{ active : step2 }">
							<i class="address card icon"></i>
							<div class="content">
							  <div class="title">Contacter</div>
							  <div class="description"></div>
							</div>
						  </a>
						  <a  v-on:click="aller_step3();" class="step" v-bind:class="{ active : step3 }">
							<i class="handshake icon"></i>
							<div class="content">
							  <div class="title">Arrangement</div>
							  <div class="description"></div>
							</div>
						  </a>
						</div>
						
						<div v-if="step1" class="ui attached segment">
						  <p>
							Aller dans le menu <a href="/#/annonces">annonces</a>.<br></br>
							Vous pouvez consulter, rechercher ou d&eacute;poser une annonce.
						  </p>
						</div>
							<div v-if="step2" class="ui attached segment">
						  <p>Dans le d&eacute;tail de l'annonce, vous pouvez obtenir les coordonn&eacute;es de l'utilisateur.<br></br>Vous pouvez d&eacute;sormais le contacter par mail ou par t&eacute;l&eacute;phone.</p>
						</div>
							<div v-if="step3" class="ui attached segment">
						  <p>Il vous reste que se mettre d'accord sur les modalit&eacute;s de transfert (lieu, taux, date...)</p>
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
           step1 : true,
		   step2 : false,
		   step3 : false
        }
    },
    methods: {
	aller_step1(){
				this.step1 = true;
				this.step2 = false;
				this.step3 = false;
	},
		aller_step2(){
				this.step1 = false;
				this.step2 = true;
				this.step3 = false;
	},
		aller_step3(){
				this.step1 = false;
				this.step2 = false;
				this.step3 = true;
	}
    }
}
</script>
