
// response for '/posts' type of request.
// module.exports.usersPost = function(req, res){
//     return res.end("<h1> Post Controller and it's router implemented </h1>");
// }

const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){console.log('Error in creating post'); return;}

        return res.redirect('back');
    });
}


module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){
        // '.id' means already converted string form of object '.id' ...
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}