//require library
const mongoose = require('mongoose');

//creating schema
const contactSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    phone: {
        type: 'string',
        required: true
    }
});

//Creating the name of the collection in database
const Contact = mongoose.model('Contact', contactSchema);

//exporting the
module.exports = Contact;
