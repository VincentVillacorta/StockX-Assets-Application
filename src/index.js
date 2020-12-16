const express = require('express')
require("./db/mongoose")
const StockXAPI = require('stockx-api')

const app = express()
const stockX = new StockXAPI()


const search = process.argv[2]

stockX.newSearchProducts(search, {
    limit:10
}).then((products) => {
    products.forEach((product) => {
        console.log(product.name)
    })
})
.catch(err => console.log('Error', err))
