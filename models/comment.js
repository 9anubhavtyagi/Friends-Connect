const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },

    // user who made comment
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // post on which comment is made
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posy'
    }
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;