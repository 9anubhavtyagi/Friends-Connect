const mongoose = require('mongoose');


// Scheam of users
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true // it tells email should be unique...
        },

        password: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps:true
    }
);


const User = mongoose.model('User', userSchema);

module.exports = User;