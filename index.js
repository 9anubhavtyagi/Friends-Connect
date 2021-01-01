const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');

// importing db from mongoose.js of config directory.
const db = require('./config/mongoose');

const session = require('express-session'); // used for session cookie.
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy'); // importing our Strategy
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash'); // used for flash notification
const customMware = require('./config/middleware');


const port = 8000;
const app = express();


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());

// using cookieParser
app.use(cookieParser());

app.use(express.static('./assets'));

// make the uploads path available to browser
app.use('/uploads', express.static(__dirname + '/uploads'));


// extracting styles and scripts from css or jss ofsub pages, and put them
// to the layout (with the layout.css linking line in 'layout.ejs' layout)

// for css(styles)
app.set('layout extractStyles', true);

// for js(scripts)
app.set('layout extractScripts', true);



app.use(expressLayouts);


// set-up view engine
app.set('view engine', 'ejs');

// indicating where are views (ejs templates) present.
app.set('views', './views');

// adding a middleware, which takes the session cookie and encrypts it.
app.use(session({
    name: 'Codeial',
    
    // TO-DO LATER before deployment in production mode.
    secret: 'blahsomething',

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

app.use(flash());
app.use(customMware.setFlash);


// using central express router
app.use('/', require('./routes/index'));





app.listen(port, function(err){
    if(err){
        // from now we use interpolation
        // nothing new just like string in '' or ""
        // but some variable(which has to be printed) can also be added.
        console.log(`Error in running the server: ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);
});