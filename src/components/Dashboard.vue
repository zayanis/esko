<template>
    <div>
        <app-menu></app-menu>
        <div class="ui container">
            <div class="row">
                <div class="column"></div>
            </div>
            <transition name="fade" mode="in-out">
                <keep-alive>
                    <router-view :key="$route.fullPath"></router-view>
                </keep-alive>
            </transition>
        </div>
		<app-footer></app-footer>
    </div>
</template>

<script>
import Menu from './Menu.vue';
import Footer from './Footer.vue';


export default {
    components: {
        'app-menu': Menu,
		'app-footer': Footer
    },
	data() {
        return {
        }
    }
}
</script>
