const express = require('express')
const session = require('express-session');
require("./db/mongoose")
const userRouter = require('./routers/user')

const app = express()

app.use(express.json())
app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000', 'https://stock-x-assets.herokuapp.com/']
    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)){   
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(session({
    secret: process.env.SECRET,
    cookie: {secure: true, sameSite: 'none'}
}));
app.use(userRouter)

module.exports = app