<template>
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
                        <input v-model="this.$store.state.customerPhoneNumber" type="number">
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
                        <input v-model="this.$store.state.customerName" type="text">
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
                        <input v-model="this.$store.state.customerAddress" type="text">
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
</template>

<script>
export default {
    name: 'CheckOut',
    methods: {
        placeOrder: async function(){

            var setArr = []

            this.$store.state.clickedItems.forEach(e => {
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
                    CustomerName: this.$store.state.customerName,
                    CustomerPhoneNumber: this.$store.state.customerPhoneNumber,
                    CustomerAddress: this.$store.state.customerAddress
                },
                OrderPlaced: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
                Payment: this.$store.state.totalCost,
                Sets: setArr
            }

            console.log(ob)

            this.axios.post(process.env.VUE_APP_ROOT_API + 'Main', 
                {
                    Customer: {
                        CustomerName: this.$store.state.customerName,
                        CustomerPhoneNumber: this.$store.state.customerPhoneNumber,
                        CustomerAddress: this.$store.state.customerAddress
                    },
                    OrderPlaced: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
                    Payment: this.$store.state.totalCost,
                    Sets: setArr
                }
            ).then(
                r => {
                        alert("Order is submitted"); 
                        console.log(r); 
                        this.$store.commit('emptyCard'); 
                        this.$store.commit('getProducts')
                        this.$store.commit('showPick')
                    }, 
                er => {
                        alert("Error"); 
                        console.log(er)
                    })           
        },
    }
}
</script>