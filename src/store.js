import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import moment from 'moment';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	countDemandes: 0,
	countUsers: 0,
	options: [
      { text: 'France', value: 'France' },
      { text: 'Tunisie', value: 'Tunisie' }
    ],
	devise: 'Y',
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
	 getOptions: state => {
	
        return state.options;
    }
	,
	 getDevise: state => {
	
        return state.devise;
    }
};

const actions = {
    requestCountDemandes({ commit }) {
        Vue.http.get('https://eskodb-f2a5.restdb.io/rest/demandes?totals=true&count=true',    {headers: {'x-apikey':'5a50e16e7679b5244b6632d4'}})
		.then(response => {
           commit('setCountDemandes', response.body.totals.count);
        });
		
    },
	 requestCountUsers({ commit }) {
        Vue.http.get('https://eskodb-f2a5.restdb.io/rest/inscrits?totals=true&count=true',    {headers: {'x-apikey':'5a50e16e7679b5244b6632d4'}})
		.then(response => {
           commit('setCountUsers', response.body.totals.count);
        });
		
    },
	 requestAllDemandes({ commit }) {
        Vue.http.get('https://eskodb-f2a5.restdb.io/rest/demandes',    {headers: {'x-apikey':'5a50e16e7679b5244b6632d4'}})
		.then(response => {
           commit('setAllDemandes', response.body);
        });
		
    },
	
	 requestDevise({ commit }) {
        
           commit('setDevise','Z');
		
    }
};

const mutations = {
	setCountDemandes(state, countDemandes) {
        state.countDemandes = countDemandes;
    },
	setCountUsers(state, countDemandes) {
        state.countUsers = countUsers;
    },
	setAllDemandes(state, demandes) {
        state.demandes = demandes;
    },
	setDevise(state, devise) {
        state.devise = devise;
    }
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
