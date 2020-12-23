const express = require('express')
require("./db/mongoose")
const StockXAPI = require('stockx-api')

const app = express()
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const stockX = new StockXAPI()

app.get('/try', async(req,res) => {
    try{
        const tenList = []
        stockX.newSearchProducts("jordan", {
            limit:10
        }).then((products) => {
            products.forEach((product) => {
                console.log(product.name)
            })
        }).catch(err => console.log('Error', err))

    } catch (e) {
        res.status(400).send(e)
    }
})
    





