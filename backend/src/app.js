const express = require('express')
const session = require('express-session');
require("./db/mongoose")
const userRouter = require('./routers/user')

const app = express()

app.use(express.json())
app.use(session({secret: 'ssshhhhh'}));
app.use(userRouter)

module.exports = app