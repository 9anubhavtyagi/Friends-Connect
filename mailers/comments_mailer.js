const nodeMailer = require('../config/nodemailer');
const Post = require('../models/post');
const User = require('../models/user');


// this is another way of exporting a method
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    Post.findById(comment.post, function(err, post){
        if (err){
            console.log("Error while sending mail: ", err);
        }

        User.findById(post.user, function(err, user){
            if (err){
                console.log("Error while sending mail: ", err);
            }
            nodeMailer.transporter.sendMail({
                from: 'anubhavtyagi00024@gmail.com',
                to: user.email,
                subject: `${comment.user.name} Commented On Your Post!`,
                html: htmlString
             }, (err, info) => {
                 if (err){
                     console.log('Error in sending mail', err);
                     return;
                 }
         
                 // console.log('Message sent', info);
                 return;
             });
        });

    });
}