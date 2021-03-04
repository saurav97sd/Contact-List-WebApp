//Need or require the library
const mongoose = require('mongoose');

//Now connecting to the database
mongoose.connect('mongodb://localhost/contacts-list-db');

//Get the connection for checking if it is successfull
const db = mongoose.connection;

// error checking
db.on('error', console.error.bind(console, 'Error Connecting to DB'));
//If successfull then print
db.once('open',function(){
    console.log('Yay!! the mongoose is successfully connected to DB');  // now we need to add this file to the server
});