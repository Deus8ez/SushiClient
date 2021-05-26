<template>
    <div id="registration-window" class="prebuilt-element" >
        <form @submit.prevent="handleRegistration" method="post">
            <ol>
                <li>
                    <h2>Register</h2>
                </li>
                <li>
                    Your nickname
                </li>
                <li>
                    <input v-model="this.$store.state.userName" type="text" name="" id="">
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
                    <input v-model="this.$store.state.userPassword" type="text" name="" id="">
                </li>
                <li>
                    Repeat your password
                </li>
                <li>
                    <input v-model="this.$store.state.userPassCheck" type="text" name="" id="">
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
    name: 'Registration',
    methods: {
        handleRegistration: async function () {
            this.axios.post(process.env.VUE_APP_ROOT_API + 'users', {
                nickname: this.$store.state.userName,
                email: this.$store.state.userEmail,
                password: this.$store.state.userPassword
            }).then(response => 
                {
                    console.log(response); 
                    if(response.status == 200){
                        alert("You registered. Now login");
                        this.$store.commit("login")
                    }
                });
        },
    }
}
</script>