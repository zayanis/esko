import Vue from 'vue';
import VueRouter from 'vue-router';
import todo from './components/Todo.vue';


Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/', redirect: '/todo' },
		{ path: '/todo', component: todo }
		
    ]
});
