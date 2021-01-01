
// importing or requiring Schema
const User = require('../models/users');



// first basic response for '/users/profile' request.
module.exports.profile = function(req, res){
    // res.end('<h1> User Profile </h1>');

    // return res.render('users_profile',{
    //     title: "Codeial profiles",
    // });

    User.findById(req.params.id, function(err, user){
        return res.render('users_profile',{
            title: "Codeial profiles",
            profile_user: user
        });
    });
    
};

// module.exports.profile2 = function(req, res){
//     res.end('<h1> User Profile -2 </h1>');
// };


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
                return res.redirect('/users/sign-in');
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