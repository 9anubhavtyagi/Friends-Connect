const express = require('express');
const port = 3000;

const db = require('./config/mongoose'); // requiring DB from mongoose.js of config directory.
const expressLayouts = require('express-ejs-layouts');

const cookieParser = require('cookie-parser');
const session = require('express-session'); // used for session cookie.

const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy'); // importing our Strategy

const MongoStore = require('connect-mongo')(session); // importing mongo-store
const sassMiddleWare = require('node-sass-middleware');

const app = express();

app.use(sassMiddleWare(
    {
        src: './assets/scss',
        dest: './assets/css',
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }
));

app.use(express.urlencoded());

// using cookieParser
app.use(cookieParser());

// using css/js in ejs templates.
app.use(express.static('./assets'));

app.set('layout extractStyles', true); // for css
app.set('layout extractScripts', true); // for js


app.use (expressLayouts);


// set-up views & view-engine
app.set('view engine', 'ejs');
app.set('views', './views');


// adding a middleware, which takes the session cookie and encrypts it.
app.use(session({
    name: 'Friends-Connect',
    
    // TO-DO LATER before deployment in production mode.
    secret: 'TO BE CHANGED LATER',

    // whenever there is a request(session) which is not initialized,
    // means user is not logged in,
    // then there is no need to store extra information in the cookie
    // that's why we set 'saveUninitialized' to false,
    saveUninitialized: false,


    // when the identity is established or some sort of session data is
    // present in the cookie, then there is no need to override it,
    // until it changes. 
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100) // 100 minutes.
    },

    // mongo store is used to store the session cookie in the DB
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok ');
    })
}));

// initialize passport
app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// using central express router
app.use('/', require('./routes/index'));



app.listen(port, function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);
});
