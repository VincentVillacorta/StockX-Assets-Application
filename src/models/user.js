const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    collection: [{
        item: {
            id: {type: string},
            lowest_ask: {type: string}
        }
    }]
})

const User = mongoose.model('User', userSchema)

module.exports = User