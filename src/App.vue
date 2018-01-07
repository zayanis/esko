<template>
    <div>
		
        <transition name="fade" mode="out-in" appear>
            <keep-alive>
                <app-accueil></app-accueil>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import accueil from './components/Dashboard.vue'


export default {
    components: {
        'app-accueil': accueil,
	
        
    },
    computed: {
        ...mapGetters({
        })
    },
    methods: {
    },
    created() {
       
    }
}
</script>
