// Central Router

const express = require("express");

const router = express.Router();

// our central router serves responses for '/' kind of requests.
// these responses are written in 'home_controller' in controllers directory.
const homeController = require('../controllers/home_controller');


router.get('/', homeController.home);



module.exports = router;
