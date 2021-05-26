import { createStore } from "vuex"
import axios from 'axios'

export default createStore({
    state: {
        mockSetList: [
            {
                set: {
                  id: 0,
                  name: "Magura",
                  cost: 1
                },
                   
            },
            {
                set: {
                  id: 1,
                  name: "Asdfg",
                  cost: 2
                },  
            }
        ],
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
        ratedSetId: '',
        ratedSetRating: ''
    },
    mutations: {
        showPick(){
            document.getElementById("pick-window").style.display = "inline-block"
            document.getElementById("build-window").style.display = "none"
            document.getElementById("checkout-window").style.display = "none"
            document.getElementById("registration-window").style.display = "none"
            document.getElementById("login-window").style.display = "none"
            document.getElementById("rating-window").style.display = "none"
        },
        addToCart(state, item){
            state.clickedItems.push(item)
            state.totalCost += item.cost
            console.log(state.clickedItems)
        },
        removeFromCart(state, set){
            state.clickedItems.splice(state.clickedItems.indexOf(set), 1) 
            state.totalCost -= set.cost
        },
        addToBuild(state, sushi){
            var item = state.buildItems.find(el => el == sushi)
            
            if(item === undefined){
                state.buildItems.push(sushi)
            } else {
                item.amount++
            }

            state.totalBuildCost += sushi.costPerPiece
            console.log(state.buildItems)
        },
        removeFromBuild(state, sushi){
            var item = state.buildItems.find(el => el == sushi)

            state.buildItems.splice(state.buildItems.indexOf(sushi), 1)

            state.totalBuildCost -= (sushi.costPerPiece * item.amount)
            item.amount = 1
            console.log(this.buildItems)
        },
        emptyCard(state){
            state.clickedItems.splice(0, state.clickedItems.length)
            state.buildItems.splice(0, state.buildItems.length)
            state.totalBuildCost = 0
            state.totalCost = 0
        },
        toggleButtons(){
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
        showRatingWindow(){
            document.getElementById("pick-window").style.display = "none"
            document.getElementById("build-window").style.display = "none"
            document.getElementById("checkout-window").style.display = "none"
            document.getElementById("registration-window").style.display = "none"
            document.getElementById("login-window").style.display = "none"
            document.getElementById("rating-window").style.display = "inline-block"
        },
        login(){
            document.getElementById("pick-window").style.display = "none"
            document.getElementById("build-window").style.display = "none"
            document.getElementById("checkout-window").style.display = "none"
            document.getElementById("registration-window").style.display = "none"
            document.getElementById("login-window").style.display = "grid"
            document.getElementById("rating-window").style.display = "none"
        },
        async getProducts(){
            await axios.get(process.env.VUE_APP_ROOT_API + 'Main').then(res =>{ console.log(res.data); this.state.mockSetList = res.data.sets; this.state.mockSushiList = res.data.sushis})    
        },
    }
})