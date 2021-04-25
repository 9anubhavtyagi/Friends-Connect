// ENTRY POINT FOR ALL THE ROUTES (Central Router)

// our central router serves responses for '/' kind of requests.
// these responses are written in 'home_controller' in controllers directory.

const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');

// console.log('router loaded');

// serving response for '/' with the help of home_controller.
router.get('/', homeController.home);


// following code is to use other router,
// when a request related to them will arrived
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/likes', require('./likes'));

// following code is to apis request
router.use('/api', require('./api'));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;