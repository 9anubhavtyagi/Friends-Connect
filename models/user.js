const mongoose = require('mongoose');

// Schema of User
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true // email should be unique for each user
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
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;