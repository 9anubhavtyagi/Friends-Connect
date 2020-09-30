const express = require('express');
const port = 3000;

const app = express();

// set-up our router
app.use('/', require('./routes/index.js'));

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
