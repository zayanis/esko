<template>
    <div>

  <h2>text</h2>
<div class="ui four statistics">
  <div class="statistic">
    <div class="value">
		0
    </div>
    <div class="label">
      Frais
    </div>
  </div>
  <div class="statistic">
    <div class="value">
	 <img src="/images/avatar/small/joe.jpg" class="ui circular inline image">
      {{ totalDemandes }}
    </div>
    <div class="label">
      Demandes
    </div>
  </div>

  <div class="statistic">
    <div class="value">
      <img src="/images/avatar/small/joe.jpg" class="ui circular inline image">
      {{ totalUsers }}
    </div>
    <div class="label">
     Inscrits
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
            totalDemandes: 'getCountDemandes',
			totalUsers: 'getCountUsers',
			inscrit: 'getInscrit'
        })
    },
    methods: {
    },
	 beforeCreate: function (){
	
	  this.$store.dispatch('requestCountDemandes');
		this.$store.dispatch('requestCountUsers');
	 },
    created() {
	
    },
    mounted() {
	 
    },
	watch: {
	totalDemandes (total){
	this.totalDemandes = total;
	},
	totalUsers (total){
	this.totalUsers = total;
	}
	},
}
</script>

