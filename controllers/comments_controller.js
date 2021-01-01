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
            
            req.flash('success', 'Your Comment has been Published!');
            res.redirect('/');
        }

    } catch(err){
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

            req.flash('success', 'Your Comment has been Deleted!');
            return res.redirect('back');

        } else{
            return res.redirect('back');
        }
    } catch(err){
        req.flash('error', err);
        return;
    }
}
