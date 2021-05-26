<template>
    <div id="pick-window" class="prebuilt-element" >
            <h2>Pick a set</h2>
            <div class="container">
                <div class="item" v-for="set in $store.state.mockSetList" :key=set.id>
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
        </div>
</template>

<script>
export default {
    name: 'PrebuiltSets',
    methods: {
        getSetImg: function (name, custom){
            if(custom == false){
                return require('../assets/' + name + '.png')
            } else {
                return require('../assets/default.png')
            }
        },
        onAddToCart: function (set){
            this.$store.commit('addToCart', set)
            this.$store.totalCost += set.cost
            console.log(this.clickedItems)
        },
    },
    mounted(){
        this.$store.commit('getProducts')
    }
}
</script>