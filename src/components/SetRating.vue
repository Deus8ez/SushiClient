<template>
    <div id="rating-window" class="prebuilt-element" >
            <h2>Rate sets</h2>
            <div class="container">
                <div class="item" v-for="set in this.$store.state.mockSetList" :key=set.id>
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
        </div>
</template>

<script>
export default {
    name: 'SetRating',
    methods: {
        getSetImg: function (name, custom){
            if(custom == false){
                return require('../assets/' + name + '.png')
            } else {
                return require('../assets/default.png')
            }
        },
        rateSet: async function(e){
            await this.axios.post(process.env.VUE_APP_ROOT_API + 'main/rate', 
                {                   
                    SetID: e.target.elements.setId.value,
                    Rating: e.target.elements.setRating.value         
                }
            ).then(r => {alert("Rating was sent"); console.log(r); this.$store.commit('getProducts'); this.$store.commit('showPick')}, er => {alert("Error"); console.log(er)})
        }
    }
}
</script>