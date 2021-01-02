const passport = require('passport');

const JWTStrategy = require('passport-jwt').Strategy; // importing jwt strategy
const ExtractJWT = require('passport-jwt').ExtractJwt; // extracting jwt

const User = require('../models/users');


// opts for JWT
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}


passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    User.findById(jwtPayLoad._id, function(err, user){
        if(err){console.log("Error in finding user from JWT"); return;}

        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    });
}));


module.exports = passport;