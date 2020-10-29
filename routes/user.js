// Router for /user/ requests

const express = require('express');

const router = express.Router();
const passport = require('passport');


// connect it to user_controller
const userController = require('../controllers/user_controller');


// serving responses -------->
router.get('/profile/:id', passport.checkAuthentication, userController.profile);

router.post('/update/:id', passport.checkAuthentication, userController.update);


router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);


router.post('/create', userController.create);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'},
), userController.createSession);


router.get('/sign-out', userController.destroySession);

module.exports = router;