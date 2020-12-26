const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    item_collection: []
})

userSchema.statics.findByUsername = async (username) => {
    const user = await User.findOne({username})
    if(!user){
        throw new Error('User not found')
    }
    return user
}

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({username})
    if(!user){
        throw new Error('Unable to login')
    }
    if(password != user.password) {
        throw new Error('Unable to login')
    }

    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User