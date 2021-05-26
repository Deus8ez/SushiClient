<template>
    <div id="login-window" class="prebuilt-element" >
        <form @submit.prevent="handleLogin" method="post">
            <ol>
                <li>
                    <h2>Login</h2>
                </li>
                <li>
                    Email
                </li>
                <li>
                    <input v-model="this.$store.state.userEmail" type="text" name="" id="">
                </li>
                <li>
                    Password
                </li>
                <li>
                    <input v-model="this.$store.state.userPassword" type="text">
                </li>
                <li style="margin-top: 1vh;">
                    <input type="submit">
                </li>
            </ol>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    methods: {
        handleLogin: async function () {
            this.axios.post(process.env.VUE_APP_ROOT_API + 'users/' + 'login', {
                email: this.$store.state.userEmail,
                password: this.$store.state.userPassword
            }).then(response => 
                {                   
                    if(response.data.token){
                    localStorage.setItem('user', JSON.stringify(response.data))}
                    this.$store.state.loggedInUserNick = response.data.userNickname
                    this.$store.commit("toggleButtons")
                    this.$store.commit("showRatingWindow")
                });
        },
    }
}
</script>