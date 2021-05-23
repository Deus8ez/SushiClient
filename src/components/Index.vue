<template>
<body>
    <header>
        <div class="title">
            <div>
                <h1>Sushi Builder</h1>    
            </div>
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
            <form @submit.prevent="placeOrder" method="post">
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
                            <input v-model="customerPhoneNumber" type="number">
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
                            <input v-model="customerName" type="text">
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
                            <input v-model="customerAddress" type="text">
                        </td>
                    </tr>
                    <tr>
                        <td></td>
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

            <div class="container">
                <div class="item" v-for="set in mockSetList" :key=set.id>
                    <ol>
                        <li style="text-align:left">
                            <h3>{{set.set.name}}</h3>                                  
                        </li>
                        <li>
                            <img class="setImg" :src="getSetImg(set.set.name, set.set.custom)" alt="" onerror="../assets/default.png">
                        </li>
                        <li>
                            <p>{{ set.set.rating == null ? 0 : set.set.rating}} star(s)</p>                                   
                        </li>
                        <li>
                            <p>cost: {{set.set.cost}}$</p>                                   
                        </li>
                        <li>
                            <button v-on:click="onAddToCart(set.set)">Add to cart</button>                                
                        </li>
                        <li>
                            <h3>Sushis in set:</h3>                                   
                        </li>                                
                    </ol>
                    <ol class="sushi-desc">
                        <li v-for="sushi in set.sushis" :key=sushi.id>
                            <p>{{sushi.name}}, cost per piece: {{sushi.costPerPiece}}, amount: {{sushi.amount}}</p>
                        </li>
                    </ol>
                </div>
            </div>


            <!-- <ol class="pickOl">
                <li class="main-list" v-for="set in mockSetList" :key=set.id>
                    <div class="item-window">
                        <div class="set-col">
                            <ol>
                                <li>
                                    <p>{{set.set.name}}</p>                                  
                                </li>
                                <li>
                                    <img class="setImg" :src="getSetImg(set.set.name, set.set.custom)" alt="" onerror="../assets/default.png">
                                </li>
                                <li>
                                    <p>{{ set.set.rating == null ? 0 : set.set.rating}} star(s)</p>                                   
                                </li>
                                <li>
                                    <p>cost: {{set.set.cost}}$</p>                                   
                                </li>
                                <li>
                                    <button v-on:click="onAddToCart(set.set)">Add to cart</button>                                
                                </li>
                                <li>
                                    <h3>Sushis in set:</h3>                                   
                                </li>                                
                            </ol>
                            <ol class="sushi-desc">
                                <li v-for="sushi in set.sushis" :key=sushi.id>
                                    <p>{{sushi.name}}, cost per piece: {{sushi.costPerPiece}}</p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </li>
            </ol> -->





        </div>
        <div id="build-window" class="prebuilt-element" >
            <div class="col">
                <h2>Build a set</h2>
                <ol class="pickOl">
                    <li v-for="set in mockSushiList" :key=set.id>
                        <ol>
                            <li>
                                <p>{{set.name}}</p>
                            </li>
                            <li>
                                <img class="setImg" :src="getSushiImg(set.name)" alt="">                               
                            </li>
                            <li>
                                <p>cost per piece: {{set.costPerPiece}}$</p>               
                            </li>
                            <li>
                                <button v-on:click="addToBuild(set)">Add to cart</button>                               
                            </li>
                        </ol>
                    </li>
                </ol>
            </div>
            <div  style="margin-left: 10vh;" class="col">
                <h2>Your build</h2>
                <input v-model="customerBuildName" type="text" placeholder="Enter your build name">
                    <p>Build cost: {{totalBuildCost}} $</p>
                    <ol>
                        <li v-for="item in buildItems" :key=item.id>
                            <p>{{item.name}}, cost per piece: {{item.costPerPiece}}, amount: {{item.amount}}</p>
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
                    <li style="margin-top: 1vh;">
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
                    <li style="margin-top: 1vh;">
                        <input type="submit">
                    </li>
                </ol>
            </form>
        </div>
        <div id="rating-window" class="prebuilt-element" >
                <h2>Rate sets</h2>
                <div class="container">
                    <div class="item" v-for="set in mockSetList" :key=set.id>
                        <form @submit.prevent="rateSet" method="post">
                            <ol>
                                <li>
                                    <input v-model="set.set.id" type="number" style="display: none" name="setId">
                                </li>
                                <li>
                                    <p>{{set.set.name}}</p>                                  
                                </li>
                                <li>
                                    <img class="setImg" :src="getSetImg(set.set.name, set.set.custom)" alt="">
                                </li>
                                <li style="margin-top: 1vh;">
                                    <select v-model="set.set.rating" name="setRating" id="" >
                                        <option value="1">&#11088;</option>
                                        <option value="2">&#11088;&#11088;</option>
                                        <option value="3">&#11088;&#11088;&#11088;</option>
                                        <option value="4">&#11088;&#11088;&#11088;&#11088;</option>
                                        <option value="5">&#11088;&#11088;&#11088;&#11088;&#11088;</option>
                                    </select>                                  
                                </li>
                                <li style="margin-top: 1vh;">
                                    <input type="submit" value="Rate">
                                </li>
                            </ol>
                        </form>
                    </div>
                </div>


                <!-- <ol class="pickOl">
                    <li class="main-list" v-for="set in mockSetList" :key=set.id>
                        <div class="item-window">
                            <div class="set-col">
                                <ol>
                                    <li>
                                        <p>{{set.name}}</p>                                  
                                    </li>
                                    <li>
                                        <img class="setImg" :src="getSetImg(set.name, set.custom)" alt="">
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
                </ol> -->
        </div>
        <div class="prebuilt-element">
            <h2>Your cart</h2>
            <p>{{totalCost}} $</p>
            <ol style="padding-left: 0">
                <li style="margin-top: 1vh;" v-for="pickedSet in clickedItems" v-bind:key="pickedSet.id">
                    {{pickedSet.name}}
                    <button v-on:click="removeFromCart(pickedSet)">Remove from cart</button>
                </li>
            </ol>
            <button v-on:click="showCheckout()">Checkout</button>
        </div>
    </div>
    <footer>
        <div style="padding-top: 2vh;">
            <a href="http://vk.com/darkhan.mukhtar">Contact me</a>
        </div>
    </footer>
</body>
</template>

<script>

export default {
    name: 'MainPage',
    data(){
        return{
            setList: [
                {
                    id: 0,
                    name: "Magura"
                }
            ],
            mockSetList: [],
            mockSushiList: [],
            data: [],
            sushiList: [],
            clickedItems: [],
            buildItems: [],
            totalCost: 0,
            totalBuildCost: 0,
            customerName: '',
            customerBuildName: '',
            customerAddress: '',
            customerPhoneNumber: '',
            userName: '',
            userEmail: '',
            userPassword: '',
            userPassCheck: '',
            loggedInUserNick: '',
            API: 'https://localhost:5001/api/',
            ratedSetId: '',
            ratedSetRating: ''
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
            this.getProducts()
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

            if(this.buildItems.length == 0){
                alert("Add items")
                return
            }

            this.onAddToCart(
                {
                    id: 0,
                    name: this.customerBuildName,
                    cost: this.totalBuildCost,
                    sushis: this.buildItems,
                    custom: true
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
            this.axios.post(this.API + 'users', {
                nickname: this.userName,
                email: this.userEmail,
                password: this.userPassword
            }).then(response => console.log(response));
        },
        handleLogin: async function () {
            this.axios.post(this.API + 'users/' + 'login', {
                email: this.userEmail,
                password: this.userPassword
            }).then(response => 
                {                   
                    if(response.data.token){
                    localStorage.setItem('user', JSON.stringify(response.data))}
                    this.loggedInUserNick = response.data.userNickname
                    this.toggleButtons()
                    this.showRatingWindow()
                });
        },
        logout: async function() {
            localStorage.removeItem('user')
            this.toggleButtons()
            this.loggedInUserNick = ""
            alert("please log in to rate sets")
            this.showPick()

        },
        checkIfUserLoggedIn: function(){
            if(localStorage.getItem("user") === null){
                document.getElementById("register-button").style.display = "inline-block"
                document.getElementById("login-button").style.display = "inline-block" 
                document.getElementById("logout-button").style.display = "none"
            } else {
                document.getElementById("register-button").style.display = "none"
                document.getElementById("login-button").style.display = "none" 
                document.getElementById("logout-button").style.display = "inline-block"
            }
        },
        placeOrder: async function(){

            var setArr = []

            this.clickedItems.forEach(e => {
                setArr.push({
                    Set: {
                        ID: e.id,
                        Name: e.name,
                        Cost: e.cost,
                        Rating: e.rating,
                        Custom: e.custom
                    },
                    Sushis: e.sushis
                })
            });

            console.log(setArr)

            var ob = {
                Customer: {
                    CustomerName: this.customerName,
                    CustomerPhoneNumber: this.customerPhoneNumber,
                    CustomerAddress: this.customerAddress
                },
                OrderPlaced: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
                Payment: this.totalCost,
                Sets: setArr
            }

            console.log(ob)

            this.axios.post(this.API + 'Main', 
                {
                    Customer: {
                        CustomerName: this.customerName,
                        CustomerPhoneNumber: this.customerPhoneNumber,
                        CustomerAddress: this.customerAddress
                    },
                    OrderPlaced: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
                    Payment: this.totalCost,
                    Sets: setArr
                }
            ).then(r => {alert("Order is submitted"); console.log(r)}, er => {alert("Error"); console.log(er)})
            this.emptyCard()
            this.showPick()
        },
        emptyCard: function(){
            this.clickedItems.splice(0, this.clickedItems.length)
            this.buildItems.splice(0, this.buildItems.length)
            this.totalBuildCost = 0
            this.totalCost = 0
        },
        getProducts: async function(){
            await this.axios.get(this.API + 'Main').then(res =>{ console.log(res.data); this.mockSetList = res.data.sets; this.mockSushiList = res.data.sushis})    
        },
        getSetImg: function (name, custom){
            if(custom == false){
                return require('../assets/' + name + '.png')
            } else {
                return require('../assets/default.png')
            }
        },
        getSushiImg: function (name){
            return require('../assets/' + name + '.png')
        },
        rateSet: async function(e){
            
            await this.axios.post(this.API + 'main/rate', 
                {                   
                    SetID: e.target.elements.setId.value,
                    Rating: e.target.elements.setRating.value         
                }
            ).then(r => {alert("Rating was sent"); console.log(r); this.getProducts()}, er => {alert("Error"); console.log(er)})
            
        }
    },
    beforeMount(){
        this.getProducts()
    },
    mounted(){       
        var storageItem = localStorage.getItem("user")
        if(storageItem != null){
            this.loggedInUserNick = (JSON.parse(localStorage.getItem("user"))).userNickname
        }
        this.checkIfUserLoggedIn()
        console.log(this.data)                            
    }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

html{
    background: ghostwhite;
    
}

body {
    font-family: 'Roboto', sans-serif;
    padding-top: 2vh;
    height: 100%;
    width: 100vw;
    background: ghostwhite;
    margin: 0;
}

footer {
  height: 50px;
  flex-shrink: 0;
  background-color: moccasin;
  text-align: center;
  margin-bottom: 0;
}

a{
    text-decoration: none;
}

#checkout-window{
    margin-bottom: 35vh;
}


#app {
  font-family: 'Roboto', sans-serif;
}

button{
    border-radius: 5px;
}

.container{
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    max-height:80vh;
    overflow:auto;
    text-align: left;
    margin-right: 5vh;
}

ol{
    padding-left: 0
}

select{
    border-radius: 0.3vh;;
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
    margin-top: 3vh;
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

#registration-window, #login-window{
    margin-bottom: 35vh;
}

#login-window{
    margin-bottom: 46vh;
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

.pickOl{
    list-style-type: none;
    max-height:70vh;
    overflow:auto;
    width: 60vh;
    padding-left: 0;
    padding-top: 1vh;
    padding-bottom: 1vh;
}

ol{
    list-style-type: none;
    padding: auto
}


input{
    border-radius: 1vh;
}

.title{
    border-bottom-style: solid;
    border-bottom-color: rgb(231, 208, 78);
}

.main-list{
    border-bottom: 1px dashed #000;
}

.item-window{
    display: grid;
    grid-template-columns: 2fr 1fr;
} 

.item-window:after{
    content: "";
    display: table;
    clear: both;
}

.set-col{
    float: left;
    width: 50%;
    padding: 10px;
}

.setImg{
    width: 38vh;
    height: 30vh;
    border-radius: 2vh;
}

</style>
