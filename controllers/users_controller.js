const User = require('../models/users');
const fs = require('fs');
const path = require('path');


module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('users_profile',{
            title: "Codeial profiles",
            profile_user: user
        });
    });
    
};


module.exports.update = async function(req, res){
        if(req.user.id == req.params.id){
            try{
                let user = await User.findById(req.params.id);
                User.uploadedAvatar(req, res, function(err){
                    if(err){
                        console.log('****Multer Error *****', err);
                        return;
                    }
                    user.name = req.body.name;
                    user.email = req.body.email;

                    if (req.file){

                        try{
                            fs.unlinkSync(path.join(__dirname, '../', user.avatar));
                        }
                        catch(error){
                            console.log("User had no associated avatar");
                        };



                        // saving the path of uploaded file into avatar field in the user
                        user.avatar = User.avatarPath + '/' + req.file.filename;
                    }

                    user.save();

                    req.flash('success', 'Profile Updated!');
                    return res.redirect('back');
                
                });

            }
            catch(err){
                req.flash('error', err);
                return res.redirect('back'); 
            }

        }
        else{
            req.flash('error', 'Unauthorized!');
            return res.status(401).send('Unauthorised');
        }

}

// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
};

// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
};


// get the sign up data
module.exports.create = function(req, res){
    // password and confirm_passwrord don't match
    if(req.body.password != req.body.confirm_password){
        req.flash('success', 'Password don\'t match. Try Again!');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            req.flash('error', err);
            return res.redirect('back');
        }

        // if user first time creating its account
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    req.flash('error', err);
                    return res.redirect('back');
                }

                req.flash('success', 'Welcome to Codeial!!!. Your account has been created');
                return res.redirect('/users/sign-in');
            });
        }

        // if user already had an account
        else{
            req.flash('success', 'This E-mail you used had already an account.');
            return res.redirect('back');
        }
    });
};


// get the sign in data and create a session for user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged In Successfully!!!');
    return res.redirect('/');
};


module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have Logged Out!!!');
    return res.redirect('/');
}