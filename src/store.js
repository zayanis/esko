import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import moment from 'moment';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    isAuthenticated: false,
    authErrorMessage: '',
    availableFoods: [],
    selectedCalendarDate: moment()
};

const getters = {
    getAvailableFoods: state => state.availableFoods,
    getSelectedCalendarDate: state => state.selectedCalendarDate,
    getManufacturers: state => state.manufacturers,
    getManufacturerById: state => id => {
        return find(state.manufacturers, manufacturer => manufacturer.id === id);
    },
    getIsAuthenticated: state => {
        return state.isAuthenticated;
    }
};

const actions = {
    countDemandes({ commit }) {
        Vue.http.get('https://eskodb-f2a5.restdb.io/rest/demandes?totals=true&count=true',    {headers: {'x-apikey':'8839bfd1e5fa501a918576b63e8813bf00e74'}},{crossDomain: "true"})
		.then(response => {
            commit('countDemandes', response.body.totals.count);
        });
    },
    requestManufacturerList({ commit }) {
        Vue.http.get('manufacturers?limit=100').then(response => {
            commit('setManufacturers', response.body._embedded.items);
        });
    },
    updateFoodInformation({ commit }, foodId) {
        Vue.http.get(`foods/${foodId}`).then(response => {
            commit('updateFood', response.body);
        });
    },
    renewToken({ commit }, oldAuthToken) {
        console.log('renew token');
        Vue.http.post('login/renew', { token: oldAuthToken }).then(response => {
            localStorage.setItem('authToken', response.body.authToken);
            commit('setIsAuthenticated', true);
        });
    }
};

const mutations = {
    setIsAuthenticated(state, isAuthenticated) {
        state.isAuthenticated = isAuthenticated;
        state.authErrorMessage = '';
    },
    setAvailableFoods(state, foods = []) {
        state.availableFoods = foods;
    },
    setSelectedCalendarDate(state, date = moment()) {
        state.selectedCalendarDate = date;
    },
    setManufacturers(state, manufacturers = []) {
        state.manufacturers = manufacturers;
    },
    updateFood(state, newFood) {
        const index = findIndex(state.availableFoods, oldFood => oldFood.id === newFood.id);
        state.availableFoods.splice(index, 1, newFood);
    }
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
