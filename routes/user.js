// Router for /user/ requests

const express = require('express');

const router = express.Router();
const passport = require('passport');


// connect it to user_controller
const userController = require('../controllers/user_controller');


// serving response for '/users/profile' with the help of users_controller.
router.get('/profile', passport.checkAuthentication, userController.profile);

// serving response for '/users/sign-up' with the help of users_controller.
router.get('/sign-up', userController.signUp);

// serving response for '/users/sign-up' with the help of users_controller.
router.get('/sign-in', userController.signIn);


// posting the data to server and creating users with the help of user_controller.
router.post('/create', userController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'},
), userController.createSession);


router.get('/sign-out', userController.destroySession);

module.exports = router;