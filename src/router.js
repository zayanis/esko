import Vue from 'vue';
import VueRouter from 'vue-router';
import accueil from './components/Accueil.vue';
import annonces from './components/Annonces.vue';
import profile from './components/Profile.vue';
import statistiques from './components/Statistiques.vue';
import login from './components/Login.vue';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/', redirect: '/annonces' },
		{ path: '/accueil', component: accueil },
		{ path: '/annonces', component: annonces },
		{ path: '/profile', component: profile },
		{ path: '/statistiques', component: statistiques },
		{ path: '/login', component: login }
		
    ]
});
