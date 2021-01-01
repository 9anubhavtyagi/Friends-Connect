const Comment = require('../models/comment');
const Post = require('../models/post');



module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                // handle the error

                post.comments.push(comment);
                post.save(); // before this comment are in RAM, after that they will be saved in DB.

                res.redirect('/');
            });
        }
    });
}


module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if(comment.user == req.user.id){
            // storing post.id so that we can delete the reference of comment,
            // which we are gonna delete, from post's comments array.
            let postId = comment.post;
            comment.remove(); // delete the comment

            // deleting the reference of deleted comment from post's comments array.
            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}