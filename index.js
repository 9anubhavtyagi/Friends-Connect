const express = require('express');
const cookieParser = require('cookie-parser'); // used to parse data from cookie
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts'); // used for layouts

// importing db from mongoose.js of config directory.
const db = require('./config/mongoose');

const session = require('express-session'); // used for session cookie
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy'); // importing local Strategy
const passportJWT = require('./config/passport-jwt-strategy'); // importing jwt Strategy
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash'); // used for flash notification
const customMware = require('./config/middleware');


// set-up for scss/sass
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));


app.use(expressLayouts);
// extracting styles and scripts from css or jss ofsub pages, and put them
// to the layout (with the layout.css linking line in 'layout.ejs' layout)

// for css(styles)
app.set('layout extractStyles', true);

// for js(scripts)
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');

// indicating where are views (ejs templates) present.
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',

    // whenever there is a request(session) which is not initialized,
    // means user is not logged in,
    // then there is no need to store extra information in the cookie
    // that's why we set 'saveUninitialized' to false,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100) // 100 minutes.
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));


// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// using central express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        // from now we use interpolation
        // nothing new just like string in '' or ""
        // but some variable(which has to be printed) can also be added.
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
