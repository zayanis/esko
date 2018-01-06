<template>
    <div id="menu">
        <div class="ui grid container">
            <div class="row">
                <div class="column">
                    <div class="ui inverted labeled icon menu right">
                       
                        <router-link to="/profile" class="item" active-class="active">
                            <i class="legal icon"></i>
                            Profile
                        </router-link>
                        <router-link to="/demandes" class="item" active-class="active">
                            <i class="users icon"></i>
                            Demandes
                        </router-link>
                        <router-link to="/taux" class="item" active-class="active">
                            <i class="currency icon"></i>
                            Taux
                        </router-link>
                        <div class="right item">
                            <div class="middle aligned content">
                                <a href="#" class="ui inverted button" @click="onLogoutClicked">
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
	

	   </div>
</template>

<script>
export default {
    methods: {
        onLogoutClicked() {
            localStorage.removeItem('authToken');
            this.$store.commit('setIsAuthenticated', false);
        }
    }
}
</script>
