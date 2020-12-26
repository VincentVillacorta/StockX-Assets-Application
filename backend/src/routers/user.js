const express = require('express')
const session = require('express-session');
const User = require('../models/user')
const StockXAPI = require('stockx-api')

const stockX = new StockXAPI()
const router = new express.Router()

// API ENDPOINTS
// Login
// Logout
// Create User
// 
// Add Item
// Delete Item
// Send Collection

router.post('/users', async (req,res) =>{
    const user = new User(req.body)
    try {
        sess = req.session;
        sess.username = req.body.username
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req,res) => {
    try{
        const user = await User.findByCredentials(req.body.username,req.body.password)       
        sess = req.session;
        sess.username = req.body.username
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logout', async (req,res) => {
    try{
        sess = req.session
        delete sess.username
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/items', async (req,res) => {
    try{
        sess = req.session
        const user = await User.findByUsername(sess.username)
        res.send(user.item_collection)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/items', async (req,res) => {
    try{
        item_name = req.body.item_name
        item_id = req.body.item_id
        sess = req.session
        const user = await User.findByUsername(sess.username)
        user.item_collection.push({item_name,item_id})
        await user.save()
        res.send(user.item_collection)
    } catch (e) {
        res.status(500).send(e)
    }
})

// router.get('/search', async(req,res) => {
//     try{
//         const tenList = []
//         stockX.newSearchProducts(req.query.name, {
//             limit:10
//         }).then((products) => {
//             products.forEach((product) => {
//                 tenList.push({
//                     name: product.name,
//                     _id: product.id})
//             })
//             res.send({tenList})
//         }).catch(err => console.log('Error', err))
        
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })




module.exports = router;
    
