//Importing the express module
const { application } = require('express');
const express = require('express');
const path = require('path'); //adding path module
const port = 8000; // default port


//-----------------------Adding the ODM---------------------------------------
const db = require('./config/mongoose');

//-----------------------adding the schema------------------------------------
const Contact = require('./models/contact');

//----------------------------------------------------------------------------
const app = express(); //firing the express module, it also creates the server instance


//-----------------------Initializing the parser------------------------------
app.use(express.urlencoded());


//-----------------------Accessing the static files---------------------------
app.use(express.static('assets'));


//------------------------------Creating Own Middleware-----------------------
//Middleware 1
// app.use(function(req,res,next){
//     //modifing the req object
//     req.myName = "Saurav";
//     next();
// });

// //Middleware 2
// app.use(function(req,res,next){
//     console.log('My name form MW 2', req.myName);
//     next();
// });


//----------------------------------------------------------------------------
//telling express that ejs will be our view engine 
app.set('view engine', 'ejs');
// creating a folder and linking it with __dirname to store views files
app.set('views', path.join(__dirname,'views'));


//----------------------------------------------------------------------------
//Creating a global varible for array to store the contacts
var contactList = [
    {
        name: 'Arpan',
        phone: '1234567890'
    },
    {
        name: 'Bhaskar',
        phone: '3333333333'
    },
    {
        name:'Nogain',
        phone: '0987654321'
    }
];

//----------------------------------------------------------------------------
//Returning response from the server
app.get('/', (req, res) =>{
    //res.send('<h1>Cool, its running ! or is it ?</h1>') //.send in espress instead of .end
    // console.log(__dirname);
    // console.log('Name from get route controller', req.myName);

    //Suppose we want our title of the page to be dynamic
    // return res.render('home', { //response from server by view rendering
        // title: 'My Contact List',

        // contact_list: contactList  //passing the contact array to the ejs file
    // });
    
    //Now instead of using the contactlist array we will use the database
    Contact.find({}, function(err, contacts){ //fetching the data from db
        if(err){ //handling errors
            console.log('Error in fetching data from the DB!');
            return;
        }

        return res.render('home', { //sending the data fetched to the view engine
            title: 'My Contact List',
            contact_list: contacts
        });
    });
});
//---------------------Another controller to render practice.ejs--------------
app.get('/practice', (req,res) =>{
    return res.render('practice',{
        title: 'Lets Play With EJS'
    });
});
//---------------------Another controller for the form created----------------
app.post('/create-contact', (req,res) =>{
    //return res.redirect('/practice');
    //console.log(req.body);
    // contactList.push(req.body); we are commenting these two lines because we
    // return res.redirect('back'); are going to create them in the database not in the contact list anymore

    Contact.create({ //creating new document of the collection in the database
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact) { //Handling the err part
        if(err){
            console.log('Error in creating the contact !');
            return;
        }
        console.log('********', newContact);
        return res.redirect('back');
    });
});
//-----------------------Another controller for deleting contact--------------
app.get('/delete-contact', (req,res) =>{
    // let phone = req.query.phone;

    // //getting the index from contact array if we find the matching phone number
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // //if we find the nymber
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }

    // //redirecting to the same page again
    // return res.redirect('back');

    //Now we will be doing the deletion in db 
    //Get id from query in the url
    let id = req.query.id;
    //finding the contact in db using id and deleting it
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error while deleting the contact from DB !');
            return;
        }
        return res.redirect('back');
    });
});


//----------------------------------------------------------------------------
app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
    }
    console.log('Yup ! My express server is running on port :', port);
});