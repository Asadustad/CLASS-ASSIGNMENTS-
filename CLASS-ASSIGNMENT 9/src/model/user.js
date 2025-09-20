const { mongoose } = require("mongoose");

const { Schema } = mongoose;

const validator = require('validator')

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,

    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email format')
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error('Password not strong enough')
            }
        }
    }
}, {
    Collection: 'users',
     timestamps: true,
})

const User = mongoose.model('User', userSchema)
module.exports = {
    User,
}