import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import lodash from 'lodash';
import moment from 'moment';
import Vue from 'vue';
import Vuex from 'vuex';
import VueSession from 'vue-session';
import VModal from 'vue-js-modal';
import VeeValidate  from 'vee-validate';
import Paginate from 'vuejs-paginate'
Vue.use(Paginate);
Vue.use(VModal);
Vue.use(VueSession);
Vue.use(Vuex);
Vue.use(VeeValidate);




const state = {
	countDemandes: 0,
	countUsers: 0,
	pays: [],
	devise: '',
	isAuthenticated: false,
	inscrit: '',
	 demandes: []
};

const getters = {
	 getCountDemandes: state => {
        return state.countDemandes;
    },
	 getCountUsers: state => {
        return state.countUsers;
    },
	 getAllDemandes: state => {
        return state.demandes;
    },
	 getPays: state => {
	
        return state.pays;
    }
	,
	 getDevise: state => {
        return state.devise;
    },
	 getisAuthenticated: state => {
        return state.isAuthenticated;
    },
	 getInscrit: state => {
        return state.inscrit;
    }
};

const actions = {
    requestCountDemandes({ commit }) {
        Vue.http.get('rest/demandes?totals=true&count=true')
		.then(response => {
           commit('setCountDemandes', response.body.totals.count);
        });
		
    },
	 requestCountUsers({ commit }) {
        Vue.http.get('rest/inscrits?totals=true&count=true')
		.then(response => {
           commit('setCountUsers', response.body.totals.count);
        });
		
    },
	 requestAllDemandes({ commit }) {
        Vue.http.get('rest/demandes')
		.then(response => {
           commit('setAllDemandes', response.body);
        });
		
    },
	requestDemandesByPays({ commit }, request) {
	
        Vue.http.get('rest/demandes',    {params:  {'q':`${request}`}})
		.then(response => {
           commit('setAllDemandes', response.body);
        });
		
    },
		requestStatistiques({ commit }, request) {
	
        //Vue.http.get('rest/demandes',    {headers: {'x-apikey':'5a50e16e7679b5244b6632d4'}, params:  {'q': `{"FROM":"${paysfrom}", "DEST": "${paysdest}"}`}})
		Vue.http.get('rest/statistiques',    {params:  {'q':`${request}`}})
		.then(response => {
           commit('setAllDemandes', response.body);
        });
		
    },
	
	 requestInscrit({ commit }, request) {
         
		 Vue.http.get('rest/inscrits',    {params:  {'q':`${request}`}})
		.then(response => {
           commit('setInscrit',  response.body);
		  
        });
		
		
    },
	 requestPays({ commit }) {
         Vue.http.get('rest/pays')
		.then(response => {
           commit('setPays',  response.body);
		  
        });
		
    }
};

const mutations = {
	setCountDemandes(state, countDemandes) {
        state.countDemandes = countDemandes;
    },
	setCountUsers(state, countUsers) {
        state.countUsers = countUsers;
    },
	setAllDemandes(state, demandes) {
	 
        state.demandes = lodash.orderBy(demandes, 'ID_DEMANDE');
    },
	setDevise(state, devise) {
        state.devise = devise;
    },
	setisAuthenticated(state, isAuthenticated) {
        state.isAuthenticated = isAuthenticated;
    },
	setInscrit(state, inscrit) {
        state.inscrit = inscrit;
    },
	setPays(state, pays) {
        state.pays = pays;
    }
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
