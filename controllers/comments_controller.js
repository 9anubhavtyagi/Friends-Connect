const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
        
            post.comments.push(comment);
            post.save(); // before this comment are in RAM, after that they will be saved in DB.
            
            if(req.xhr){
                // Similar for comments to fetch the user's id.
                comment = await comment.populate('user', 'name').execPopulate();

                return res.status(200).json({
                    data:{
                        comment: comment
                    },
                    message: "Post Created!"
                });
            }

            req.flash('success', 'Your Comment has been Published!');
            res.redirect('/');
        }

    }
    catch(err){
        req.flash('error', err);
        return;
    }
}

module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);
        
        if(comment.user == req.user.id){
            // storing post.id so that we can delete the reference of comment,
            // which we are gonna delete, from post's comments array.
            let postId = comment.post;
            comment.remove(); // delete the comment

            // deleting the reference of deleted comment from post's comments array.
            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Comment Deleted!');
            return res.redirect('back');

        } else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error', err);
        return;
    }
}
