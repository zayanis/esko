import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App.vue';
import router from './router';
import store from './store';
import "../node_modules/ag-grid/dist/styles/ag-grid.css";
import "../node_modules/ag-grid/dist/styles/ag-theme-balham-dark.css";
Vue.use(VueResource);
Vue.http.options.root = process.env.API_URL;
Vue.http.headers.common['x-apikey'] = '5a50e16e7679b5244b6632d4';
Vue.http.interceptors.push(function (request, next) {
		 request.headers.set('x-apikey', '5a50e16e7679b5244b6632d4');
    
    next(response => {
    });
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
