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
    </div>
</template>

<script>
import Menu from './Menu.vue';

export default {
    components: {
        'app-menu': Menu
    },
	data() {
        return {
        }
    }
}
</script>
