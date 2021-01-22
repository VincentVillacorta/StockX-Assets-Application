const express = require('express')
const session = require('express-session');
require("./db/mongoose")
const userRouter = require('./routers/user')

const app = express()

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://stock-x-assets.herokuapp.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(session({
    secret: process.env.SECRET,
    cookie: {secure: false}
}));
app.use(userRouter)

module.exports = app