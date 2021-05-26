<template>
    <header>
        <div class="title">
            <div>
                <h1>Sushi Builder</h1>    
            </div>
        </div>
        <Navigation ref="$nav"/>
    </header>
    <body>
      <div id="main-page">
        <PrebuiltSets/>
        <SetBuilder/>
        <SetRating/>
        <Checkout/>
        <Registration/>
        <Login/>
        <Cart/>
      </div>
      <footer>
        <div style="padding-top: 2vh;">
            <a href="http://vk.com/darkhan.mukhtar">Contact me</a>
        </div>
      </footer>
    </body>
</template>

<script>
import Navigation from './components/Navigation'
import PrebuiltSets from './components/PrebuiltSets'
import SetBuilder from './components/SetBuilder'
import SetRating from './components/SetRating'
import Cart from './components/Cart'
import Checkout from './components/CheckOut'
import Registration from './components/Registration'
import Login from './components/Login'

export default {
  components: {
    Navigation,
    PrebuiltSets,
    SetBuilder,
    SetRating,
    Cart,
    Checkout,
    Registration,
    Login,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

html{
    background: ghostwhite;
}

body {
    font-family: 'Roboto', sans-serif;
    padding-top: 2vh;
    height: 100vh;
    width: 100vw;
    background: ghostwhite;
    margin: 0;
    display: flex;
    flex-direction: column;
}

footer {
  height: 50px;
  flex-shrink: 0;
  background-color: moccasin;
  text-align: center;
  margin-top: auto;
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
