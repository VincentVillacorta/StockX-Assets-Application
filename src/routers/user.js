const express = require('express')
const session = require('express-session');
const User = require('../models/user')
const StockXAPI = require('stockx-api')
const {getFullItem, searchItem} = require('../stock-x/stock-x-functions')
const stockX = new StockXAPI()
const router = new express.Router()

// API ENDPOINTS

// Creating a user
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

//User Log In
router.post('/users/login', async (req,res) => {
    try{
        const user = await User.findByCredentials(req.body.username,req.body.password)       
        sess = req.session;
        sess.username = req.body.username
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//User Log Out
router.post('/users/logout', async (req,res) => {
    try{
        sess = req.session
        delete sess.username
        res.status(200).send()
    } catch (e) {
        res.status(500).send(e)
    }
})

//Get All User Items
router.get('/users/items', async (req,res) => {
    try{
        sess = req.session
        const user = await User.findByUsername(sess.username)
        res.status(200).send(user.item_collection)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Search Item by Name (for search bar)
router.get('/search', async (req,res) => {
    try{
        const itemList = await searchItem(req.query.item_name)
        res.status(200).send(itemList)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

//Get Any Single Item
router.get('/users/item', async (req,res) => {
    try{
        const item = await getFullItem(req.query.item_name, req.query.item_id)
        res.status(200).send(item)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

//Get A User's Full Collection Value based on Lowest Ask
router.get('/users/fullvalue', async (req,res) => {
    try{
        sess = req.session
        const user = await User.findByUsername(sess.username)
        const itemList = user.item_collection
        let fullValue = 0
        for(const item of itemList) {
            const tempItem = await getFullItem(item.item_name, item.item_id)
            fullValue += tempItem.lowest_ask
        }
        res.status(200).send(fullValue.toString())
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

//Add an item for user collection
router.patch('/users/items', async (req,res) => {
    try{
        item_name = req.body.item_name
        item_id = req.body.item_id
        sess = req.session
        const user = await User.findByUsername(sess.username)
        user.item_collection.push({item_name,item_id})
        await user.save()
        res.status(200).send(user.item_collection)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Delete an Item for user collection
router.delete('/users/items', async (req,res) => {
    try{
        item_name = req.body.item_name
        item_id = req.body.item_id
        sess = req.session
        const user = await User.findByUsername(sess.username)
        user.item_collection = user.item_collection.filter((item) => {
            item_id != item_id
        })
        await user.save()
        res.status(200).send(user.item_collection)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router;
    
