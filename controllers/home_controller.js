// importing Schemas
const Post = require('../models/post');
const User = require('../models/user');

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
        User.find({}, function(err, users){
            return res.render('home', {
                title: "Friends-Connect Home",
                heading: "Friends-Connect Home Wall",
                posts: posts,
                all_users: users
            });
        });
    });
}