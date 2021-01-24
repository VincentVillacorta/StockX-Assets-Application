const express = require('express')
const session = require('express-session');
var cors = require('cors');
require("./db/mongoose")
const userRouter = require('./routers/user')

const app = express()

app.use(express.json())
app.use(cors({credentials: true}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://stock-x-assets.herokuapp.com');
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS, HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(session({
    secret: process.env.SECRET,
    // cookie: {secure: false}
    // cookie: {secure: true, sameSite: 'strict'}
    cookie: {secure: true, sameSite: 'none'}
}));
app.use(userRouter)

module.exports = app