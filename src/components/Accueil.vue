<template>
    <div class="row">
        <div class="four wide column">
            <h1>accueil</h1>
			Total demandes: <span>{{ totalDemandes }}</span>
			Total users: <span>{{ totalUsers }}</span>
        </div>
  
    </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
  
   
    computed: {
        ...mapGetters({
            totalDemandes: 'getCountDemandes',
			totalUsers: 'getCountUsers'
        })
    },
    methods: {
    },
    created() {
    },
    mounted() {
	this.$store.dispatch('requestCountDemandes');
	this.$store.dispatch('requestCountUsers');
    }
}
</script>

