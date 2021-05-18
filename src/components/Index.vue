<template>
<body>
    <header>
        <div class="title">
            <h1>Sushi Builder</h1>           
        </div>
        <div class="navigation">
            <div class="col">
                <div class="nav-element">
                    <button v-on:click="showPick()">Pick sushi set</button>
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
                    <p id="nickname">{{loggedInUserNick}}</p>
                </div>  
                <div id="register-button" class="nav-element">
                    <button v-on:click="register()">Register</button>
                </div>        
                <div id="login-button" class="nav-element">
                    <button v-on:click="login()">Log in</button>
                </div>
                <div id="logout-button" class="nav-element">
                    <button v-on:click="logout()">Logout</button>
                </div>
            </div>
        </div>
    </header>
    <div id="main-page">
        <div id="checkout-window" class="prebuilt-element" >
            <h2>Checkout</h2>
            <form action="">
                <table>
                    <tr>
                        <td>
                            <p>
                                Your phone number
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input v-model="userPhoneNumber" type="number">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>
                                Your name
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input v-model="userName" type="text">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>
                                Address
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input v-model="userAdress" type="text">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="submit">
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <div id="pick-window" class="prebuilt-element" >
            <h2>Pick a set</h2>
            <ol>
                <li class="main-list" v-for="set in mockSetList" :key=set.id>
                    <div class="item-window">
                        <div class="set-col">
                            <ol>
                                <li>
                                    <p>{{set.text}}</p>                                  
                                </li>
                                <li>
                                    <img src="" alt="">
                                </li>
                                <li>
                                    <p>{{ set.rating }} star(s)</p>                                   
                                </li>
                                <li>
                                    <p>cost: {{set.cost}}$</p>                                   
                                </li>
                                <li>
                                    <button v-on:click="onAddToCart(set)">Add to cart</button>                                
                                </li>
                                <li>
                                    <h3>Sushis in set:</h3>                                   
                                </li>                                
                            </ol>
                            <ol class="sushi-desc">
                                <li v-for="sushi in set.sushis" :key=sushi.id>
                                    <p>{{sushi.text}}, cost per piece: {{sushi.costPerPiece}}</p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </li>
            </ol>
        </div>
        <div id="build-window" class="prebuilt-element" >
            <div class="col">
                <h2>Build a set</h2>
                <ol>
                    <li v-for="set in mockSushiList" :key=set.id>
                        <p>{{set.text}}</p>
                        <p>cost per piece: {{set.costPerPiece}}$</p>
                        <button v-on:click="addToBuild(set)">Add to cart</button>
                    </li>
                </ol>
            </div>
            <div class="col">
                <h2>Your build</h2>
                <input v-model="customerBuildName" type="text" placeholder="Enter your build name">
                    <p>Build cost: {{totalBuildCost}} $</p>
                    <ol>
                        <li v-for="item in buildItems" :key=item.id>
                            <p>{{item.text}}, cost per piece: {{item.costPerPiece}}, amount: {{item.amount}}</p>
                            <button v-on:click="removeFromBuild(item)">Remove from build</button>
                        </li>
                    </ol>
                <button v-on:click="buildAndAddToCart()">Build and add to cart</button>  
            </div>
        </div>
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
                        <input v-model="userName" type="text" name="" id="">
                    </li>
                    <li>
                        Email
                    </li>
                    <li>
                        <input v-model="userEmail" type="text" name="" id="">
                    </li>
                    <li>
                        Password
                    </li>
                    <li>
                        <input v-model="userPassword" type="text" name="" id="">
                    </li>
                    <li>
                        Repeat your password
                    </li>
                    <li>
                        <input v-model="userPassCheck" type="text" name="" id="">
                    </li>
                    <li>
                        <input type="submit">
                    </li>
                </ol>
            </form>
        </div>
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
                        <input v-model="userEmail" type="text" name="" id="">
                    </li>
                    <li>
                        Password
                    </li>
                    <li>
                        <input v-model="userPassword" type="text">
                    </li>
                    <li>
                        <input type="submit">
                    </li>
                </ol>
            </form>
        </div>
        <div id="rating-window" class="prebuilt-element" >
            <form @submit.prevent="rate" method="post">
                <h2>Rate sets</h2>
                <ol>
                    <li class="main-list" v-for="set in mockSetList" :key=set.id>
                        <div class="item-window">
                            <div class="set-col">
                                <ol>
                                    <li>
                                        <p>{{set.text}}</p>                                  
                                    </li>
                                    <li>
                                        <img src="" alt="">
                                    </li>
                                    <li>
                                        <select v-model="set.rating" name="rating" id="">
                                            <option value="1">&#11088;</option>
                                            <option value="2">&#11088;&#11088;</option>
                                            <option value="3">&#11088;&#11088;&#11088;</option>
                                            <option value="4">&#11088;&#11088;&#11088;&#11088;</option>
                                            <option value="5">&#11088;&#11088;&#11088;&#11088;&#11088;</option>
                                        </select>                                  
                                    </li>                             
                                </ol>
                            </div>
                        </div>
                    </li>
                </ol>
                <ol>
                    <li><input type="submit" value="Rate sets"></li>
                </ol>
            </form>
        </div>
        <div class="prebuilt-element">
            <h2>Your cart</h2>
            <p>{{totalCost}} $</p>
            <ol>
                <li v-for="pickedSet in clickedItems" v-bind:key="pickedSet.id">
                    {{pickedSet.text}}
                    <button v-on:click="removeFromCart(pickedSet)">Remove from cart</button>
                </li>
            </ol>
            <button v-on:click="showCheckout()">Checkout</button>
        </div>
    </div>
</body>
</template>

<script>

export default {
    name: 'MainPage',
    data(){
        return{
            setList: [],
            mockSetList: [
            { 
                id: 1, 
                text: 'Boston', 
                cost: 40,
                rating: 1,
                sushis: [
                    {id: 1, text: 'California', costPerPiece: 2, amount: 10},
                    {id: 2, text: 'Philadelphia', costPerPiece: 4, amount: 5}
                ]           
            },
            { 
                id: 2, 
                text: 'Adfg', 
                cost: 30,
                rating: 2,
                sushis: [
                    {id: 1, text: 'California', costPerPiece: 2, amount: 10},
                    {id: 2, text: 'Philadelphia', costPerPiece: 4, amount: 5}
                ]       
            },
            { 
                id: 3,
                text: 'Banzai', 
                cost: 20,
                rating: 2,
                sushis: [
                    {id: 1, text: 'California', costPerPiece: 2, amount: 10},
                    {id: 2, text: 'Philadelphia', costPerPiece: 4, amount: 5}
                ]       
            }],
            mockSushiList: [
                { id: 1, text: 'California', costPerPiece: 2, amount: 1},
                { id: 2, text: 'Philadelphia', costPerPiece: 4, amount: 1},
                { id: 3, text: 'Chicken', costPerPiece: 6, amount: 1},
                { id: 4, text: 'Schrimp', costPerPiece: 8, amount: 1},
                { id: 5, text: 'Caesar', costPerPiece: 10, amount: 1}
            ],
            sushiList: [],
            clickedItems: [],
            buildItems: [],
            totalCost: 0,
            totalBuildCost: 0,
            customerName: '',
            customerBuildName: '',
            customerAdress: '',
            customerPhoneNumber: '',
            userName: '',
            userEmail: '',
            userPassword: '',
            userPassCheck: '',
            loggedInUserNick: '',
        }
    },
    methods: {
        showPick: function(){
            document.getElementById("pick-window").style.display = "inline-block"
            document.getElementById("build-window").style.display = "none"
            document.getElementById("checkout-window").style.display = "none"
            document.getElementById("registration-window").style.display = "none"
            document.getElementById("login-window").style.display = "none"
            document.getElementById("rating-window").style.display = "none"
        },
        showBuild: function(){
            document.getElementById("pick-window").style.display = "none"
            document.getElementById("build-window").style.display = "grid"
            document.getElementById("checkout-window").style.display = "none"
            document.getElementById("registration-window").style.display = "none"
            document.getElementById("login-window").style.display = "none"
            document.getElementById("rating-window").style.display = "none"
        },
        showCheckout: function(){
            document.getElementById("pick-window").style.display = "none"
            document.getElementById("build-window").style.display = "none"
            document.getElementById("checkout-window").style.display = "inline-block"
            document.getElementById("registration-window").style.display = "none"
            document.getElementById("login-window").style.display = "none"
            document.getElementById("rating-window").style.display = "none"
        },
        register: function(){
            document.getElementById("pick-window").style.display = "none"
            document.getElementById("build-window").style.display = "none"
            document.getElementById("checkout-window").style.display = "none"
            document.getElementById("registration-window").style.display = "grid"
            document.getElementById("login-window").style.display = "none"
            document.getElementById("rating-window").style.display = "none"
        },
        login: function(){
            document.getElementById("pick-window").style.display = "none"
            document.getElementById("build-window").style.display = "none"
            document.getElementById("checkout-window").style.display = "none"
            document.getElementById("registration-window").style.display = "none"
            document.getElementById("login-window").style.display = "grid"
            document.getElementById("rating-window").style.display = "none"
        },
        toggleButtons() {
            if(
                document.getElementById("register-button").style.display != "none" &&
                document.getElementById("login-button").style.display != "none" &&
                document.getElementById("logout-button").style.display != "inline-block"  
            ){
                document.getElementById("register-button").style.display = "none"
                document.getElementById("login-button").style.display = "none" 
                document.getElementById("logout-button").style.display = "inline-block"  
            } else{
                document.getElementById("register-button").style.display = "inline-block"
                document.getElementById("login-button").style.display = "inline-block" 
                 document.getElementById("logout-button").style.display = "none" 
            }
 
        },
        showRatingWindow: function(){
            document.getElementById("pick-window").style.display = "none"
            document.getElementById("build-window").style.display = "none"
            document.getElementById("checkout-window").style.display = "none"
            document.getElementById("registration-window").style.display = "none"
            document.getElementById("login-window").style.display = "none"
            document.getElementById("rating-window").style.display = "inline-block"
        },
        onAddToCart: function (set){
            this.clickedItems.push(set)
            this.totalCost += set.cost
            console.log(this.clickedItems)
        },
        removeFromCart: function (set){
            this.clickedItems.splice(this.clickedItems.indexOf(set), 1) 
            this.totalCost -= set.cost
            console.log(this.clickedItems)
        },
        addToBuild: function (sushi){
            var item = this.buildItems.find(el => el == sushi)
            
            if(item === undefined){
                this.buildItems.push(sushi)
            } else {
                item.amount++
            }

            this.totalBuildCost += sushi.costPerPiece
            console.log(this.buildItems)
        },
        removeFromBuild: function (sushi){
            var item = this.buildItems.find(el => el == sushi)

            this.buildItems.splice(this.buildItems.indexOf(sushi), 1)

            this.totalBuildCost -= (sushi.costPerPiece * item.amount)
            item.amount = 1
            console.log(this.buildItems)
        },
        buildAndAddToCart: function (){
            if(this.customerBuildName == ''){
                alert("Enter build name")
                return
            }

            this.onAddToCart(
                {
                    id: 0,
                    text: this.customerBuildName,
                    cost: this.totalBuildCost,
                    sushis: this.buildItems
                }
            )
        },
        checkIfLoggedIn: function (){
            if(localStorage.getItem("user") === null){
                alert("please log in to rate sets")
            } else {
                this.showRatingWindow()
            }
        }, 
        handleRegistration: async function () {
            this.axios.post('https://localhost:5001/api/' + 'users', {
                nickname: this.userName,
                email: this.userEmail,
                password: this.userPassword
            }).then(response => console.log(response));
        },
        handleLogin: async function () {
            this.axios.post('https://localhost:5001/api/' + 'users/' + 'login', {
                email: this.userEmail,
                password: this.userPassword
            }).then(response => 
                {
                    console.log(response)
                    
                    if(response.data.token){
                    localStorage.setItem('user', JSON.stringify(response.data))}
                    this.loggedInUserNick = response.data.userNickname
                    this.toggleButtons()
                });
        },
        logout: async function() {
            localStorage.removeItem('user')
            this.toggleButtons()
        }
    },
    mounted(){
        this.axios.get('https://localhost:5001/api/' + 'Main').then(response => console.log(response))
    }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

html, body {
  font-family: 'Roboto', sans-serif;
}



body {
    padding-top: 2vh;
    height: 100vh;
    width: 100vw;
    background: ghostwhite;
    margin: 0;
}

#app {
  font-family: 'Roboto', sans-serif;
}

button{
    border-radius: 5px;
}

button:hover{
    color:peru;
    cursor: pointer;
}

.nav-element{
    display: inline-block;
    padding: 0.5vh;
}

.user_elements{
    display: inline-block;
}

.title{
    text-align: center;
}

.navigation{
    text-align: left;
    margin-left: 20vh;
    display: grid;
    grid-template-columns: 3fr 1fr;
}

#main-page{
    margin-left: 20vh;
    display: grid;
    grid-template-columns: 3fr 1fr;
}

#build-window, #checkout-window, #registration-window, #login-window, #rating-window{
    display: none;
    grid-template-columns: 1fr 2fr;
}

#logout-button{
    display: none;
    padding: 0.5vh;
}

#nickname{
    margin-top: 0%;
    margin-bottom: 0%;
}

th{
    text-align: left;
}

ol{
    list-style-type: none;
    max-height:70vh;
    overflow:auto;
    width: 40vh;
    padding-left: 0;
    padding-top: 1vh;
    padding-bottom: 1vh;
}

.main-list{
    border-bottom: 1px dashed #000;
}

.item-window{
    display: grid;
    grid-template-columns: 2fr 1fr;
}

</style>
