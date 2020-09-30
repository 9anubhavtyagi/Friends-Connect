const express = require('express');
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose'); // requiring DB from mongoose.js of config directory.

const app = express();

// using css/js in ejs templates.
app.use(express.static('./assets'));

app.set('layout extractStyles', true); // for css
app.set('layout extractScripts', true); // for js


app.use (expressLayouts);



// set-up our router
app.use('/', require('./routes/index'));

// set-up views & view-engine
app.set('view engine', 'ejs');
app.set('views', './views');




app.listen(port, function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);
});
