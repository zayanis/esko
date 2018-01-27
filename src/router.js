import Vue from 'vue';
import VueRouter from 'vue-router';
import annonces from './components/Annonces.vue';
import profile from './components/Profile.vue';
import statistiques from './components/Statistiques.vue';
import login from './components/Login.vue';
import parrainage from './components/Parrainage.vue';


Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/', redirect: '/annonces' },
		{ path: '/annonces', component: annonces },
		{ path: '/profile', component: profile },
		{ path: '/statistiques', component: statistiques },
		{ path: '/parrainage', component: parrainage },
		{ path: '/login', component: login }
		
    ]
});
