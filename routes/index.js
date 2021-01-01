// ENTRY POINT FOR ALL THE ROUTES

// NOTE --> here during imporing, same instance of express
// is imported as for others files in this web-app.
const express = require('express');


// creating a central router
const router = express.Router();




// our central router serves responses for '/' kind of requests.
// these responses are written in 'home_controller' in controllers directory.
// that's why we used it
const homeController = require('../controllers/home_controller');


// serving response for '/' with the help of home_controller.
router.get('/', homeController.home);


// router.get('/', homeController.home);


// indicating to use 'users.js' router when,
// requests (related to users) will come.
router.use('/users', require('./users'));


// indicating to use 'posts.js' router when,
// requests (related to posts) will come.
router.use('/posts', require('./posts'));


// indicating to use 'commentss.js' router when,
// requests (related to comments) will come.
router.use('/comments', require('./comments'));

// exporting the central router
module.exports = router;