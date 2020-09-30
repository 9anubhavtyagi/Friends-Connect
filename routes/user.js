// Router for /user/ requests

const express = require('express');

const router = express.Router();


// connect it to user_controller
const userController = require('../controllers/user_controller');

router.get('/profile', userController.profile);


module.exports = router;