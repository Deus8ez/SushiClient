<template>
    <div class="prebuilt-element">
            <h2>Your cart</h2>
            <p>{{this.$store.state.totalCost}} $</p>
            <ol style="padding-left: 0">
                <li style="margin-top: 1vh;" v-for="pickedSet in $store.state.clickedItems" v-bind:key="pickedSet.id">
                    {{pickedSet.name}}
                    <button v-on:click="removeFromCart(pickedSet)">Remove from cart</button>
                </li>
            </ol>
            <button v-on:click="showCheckout()">Checkout</button>
        </div>
</template>

<script>
export default {
    name: 'Cart',
    methods: {
        removeFromCart: function (set){
            this.$store.commit('removeFromCart', set)
        },
        showCheckout: function(){
            document.getElementById("pick-window").style.display = "none"
            document.getElementById("build-window").style.display = "none"
            document.getElementById("checkout-window").style.display = "inline-block"
            document.getElementById("registration-window").style.display = "none"
            document.getElementById("login-window").style.display = "none"
            document.getElementById("rating-window").style.display = "none"
        },
    }
}
</script>