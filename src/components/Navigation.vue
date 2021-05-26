<template>
    <div class="navigation">
            <div class="col">
                <div class="nav-element">
                    <button v-on:click="this.$store.commit('showPick')">Pick sushi set</button>
                </div>
                <div class="nav-element">
                    <button v-on:click="showBuild()">Build sushi set</button>
                </div>
                <div class="nav-element">
                    <button v-on:click="checkIfLoggedIn()">Rate sushi set</button>
                </div>
            </div>
            <div class="col">
                <div class="nav-element">
                    <p id="nickname">{{this.$store.state.loggedInUserNick}}</p>
                </div>  
                <div id="register-button" class="nav-element">
                    <button v-on:click="register()">Register</button>
                </div>        
                <div id="login-button" class="nav-element">
                    <button v-on:click="this.$store.commit('login')">Log in</button>
                </div>
                <div id="logout-button" class="nav-element">
                    <button v-on:click="logout()">Logout</button>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: 'Navigation',
    methods: {
        showBuild: function(){
            document.getElementById("pick-window").style.display = "none"
            document.getElementById("build-window").style.display = "grid"
            document.getElementById("checkout-window").style.display = "none"
            document.getElementById("registration-window").style.display = "none"
            document.getElementById("login-window").style.display = "none"
            document.getElementById("rating-window").style.display = "none"
        },
        checkIfLoggedIn: function (){
            if(localStorage.getItem("user") === null){
                alert("please log in to rate sets")
            } else {
                this.$store.commit("showRatingWindow")
            }
        }, 
        register: function(){
            document.getElementById("pick-window").style.display = "none"
            document.getElementById("build-window").style.display = "none"
            document.getElementById("checkout-window").style.display = "none"
            document.getElementById("registration-window").style.display = "grid"
            document.getElementById("login-window").style.display = "none"
            document.getElementById("rating-window").style.display = "none"
        },
        logout: async function() {
            localStorage.removeItem('user')
            this.$store.commit("toggleButtons")
            this.$store.state.loggedInUserNick = ""
            this.showPick()
            alert("please log in to rate sets")
        }
    }
}
</script>
