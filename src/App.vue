<template>
	   <div>
        <transition name="fade" mode="out-in" appear>
            <keep-alive>

                <app-todo></app-todo>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import todo from './components/Todo.vue';

export default {
    components: {
        'app-todo': todo
 
    }
 
}
</script>
