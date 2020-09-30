const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/friends_connect_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error Connecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to DATABASE :: MongoDB');
});

module.exports = db;