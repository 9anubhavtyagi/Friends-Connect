// importing Schemas
const User = require('../models/user');


// /user/profile response
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile',{
            title: "Friends-Connect profiles",
            profile_user: user
        });
    });
};


module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorised');
    }
}


// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }

    return res.render('user_sign_up',{
        title: "Friends-Connect | Sign Up"
    });
};

// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }

    return res.render('user_sign_in',{
        title: "Friends-Connect | Sign In"
    });
}

// get the sign up data
module.exports.create = function(req, res){

    // password and confirm_passwrord don't match
    if(req.body.password != req.body.confirm_password){
        console.log("Password and confirm password not match");
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error in finding user during sign-up');
            return;
        }

        // if user first time creating its account
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('Error in finding user during sign-up');
                    return;
                }
                console.log("User account is created")
                return res.redirect('/user/sign-in');
            });
        }

        // if user already had an account
        else{
            console.log("User already had an account")
            return res.redirect('back');
        }
    });
};


// get the sign in data and create a session for user
module.exports.createSession = function(req, res){
    return res.redirect('/');
};


module.exports.destroySession = function(req, res){
    req.logout();

    return res.redirect('/');
}