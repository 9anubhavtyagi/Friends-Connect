const Post = require('../models/post');


module.exports.home = function(req, res){
    // '{}' is empty query to fetch all comments.
    // also populating the user of each post.
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        return res.render('home', {
            title: "Friends-Connect",
            heading: "Friends-Connect",
            posts: posts
        });
    });
}