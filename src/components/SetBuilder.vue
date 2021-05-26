<template>
    <div id="build-window" class="prebuilt-element" >
            <div class="col">
                <h2>Build a set</h2>
                <ol class="pickOl">
                    <li v-for="set in this.$store.state.mockSushiList" :key=set.id>
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
                <input v-model="this.$store.state.customerBuildName" type="text" placeholder="Enter your build name">
                    <p>Build cost: {{this.$store.state.totalBuildCost}} $</p>
                    <ol>
                        <li v-for="item in this.$store.state.buildItems" :key=item.id>
                            <p>{{item.name}}, cost per piece: {{item.costPerPiece}}, amount: {{item.amount}}</p>
                            <button v-on:click="removeFromBuild(item)">Remove from build</button>
                        </li>
                    </ol>
                <button v-on:click="buildAndToCart()">Build and to cart</button>  
            </div>
        </div>
</template>

<script>
export default {
    name: 'SetBuilder',
    methods: {
        getSushiImg: function (name){
            return require('../assets/' + name + '.png')
        },
        addToBuild: function (sushi){
            this.$store.commit('addToBuild', sushi)
        },
        removeFromBuild: function (sushi){
            this.$store.commit('removeFromBuild', sushi)
        },
        buildAndToCart: function (){
            if(this.$store.state.customerBuildName == ''){
                alert("Enter build name")
                return
            }

            if(this.$store.state.buildItems.length == 0){
                alert("Add items")
                return
            }

            this.$store.commit('addToCart', {
                    id: 0,
                    name: this.$store.state.customerBuildName,
                    cost: this.$store.state.totalBuildCost,
                    sushis: this.$store.state.buildItems,
                    custom: true
            })
        }
    }
}
</script>