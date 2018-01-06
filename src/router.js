import Vue from 'vue';
import VueRouter from 'vue-router';
import accueil from './components/Accueil.vue';
import demandes from './components/Demandes.vue';
import profile from './components/Profile.vue';
import taux from './components/Taux.vue';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/', redirect: '/accueil' },
        { path: '/accueil', component: accueil },
		{ path: '/demandes', component: demandes },
		{ path: '/profile', component: profile },
		{ path: '/taux', component: taux }
		
    ]
});
