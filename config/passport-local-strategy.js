const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user)  {
            if (err){
                req.flash('error', err);
                return done(err);
            }
            // if there is no user with given email or password mismatch
            if (!user || user.password != password){
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        });
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});


// creating a function to check if user is authenticated or not,
// we used it as a middle-eware
passport.checkAuthentication = function(req, res, next){
    // if user is signed in, then pass on the request 
    // to the next function (controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session
        // cookie and we are just sending thisvto the locals for the views
        res.locals.user = req.user;
    }

    next();
}


// exporting Strategy to use
module.exports = passport;