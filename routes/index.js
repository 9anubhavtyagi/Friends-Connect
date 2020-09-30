// Central Router for '/' requests

const express = require("express");

const router = express.Router();

// connection to home_controller
const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);


// connection to other routes
router.use('/user', require('./user'));


module.exports = router;
