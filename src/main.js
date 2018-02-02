import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App.vue';
import router from './router';
import store from './store';
import '../node_modules/semantic-ui-css/semantic.min.css';

Vue.use(VueResource);
Vue.http.options.root = process.env.API_URL;
Vue.http.headers.common['x-apikey'] = '5a50e16e7679b5244b6632d4';
Vue.http.interceptors.push(function (request, next) {
    const authToken = localStorage.getItem('authToken');
    if (authToken !== null) {

		 request.headers.set('x-apikey', '5a50e16e7679b5244b6632d4');
    }
    next(response => {
        if ((response.status === 401) && (this !== null)) {
            if (authToken !== null) {
                localStorage.removeItem('authToken');
                this.$store.dispatch('renewToken', authToken);
            }
            this.$store.commit('setIsAuthenticated', false);
            this.$store.state.authErrorMessage = 'Your session has expired.';
        }
    });
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
