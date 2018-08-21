var express = require('express'),
cookieParser = require('cookie-parser'), 
session = require('express-session');
var bodyparser = require('body-parser');
var path = require('path');


var app = express();
const port = process.env.PORT || 7000;



var router = require('./routes/main_route');

var api = require('./routes/api_route');


// Middleware 

app.use(cookieParser()); // required before session.
app.use(session({secret: 'keyboard cat',resave: false,saveUninitialized: true}));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));



// set view engine 
app.set('view engine', 'ejs');


// Everything in public will be accessible from '/'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'views')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });


// ADMIN ROUTE

app.use('/',router);

app.use('/api', api);




app.use('/contact-us',router);
app.use('/about-us',router);
app.use('/terms-of-use',router);
app.use('/faq',router);
app.use('/privacy-policy',router);


//account Route
app.use('/register',router);
app.use('/Login',router);
app.use('/reset_password',router);

// Movies Route 
app.use('/trailers',router);
app.use('/trailers/id',router);
app.use('/upcoming',router);
app.use('/cenima',router);

app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
   
    // handle CSRF token errors here
    res.status(403);
    res.send('form tampered with');
  });




app.listen(port, ()=>{
    console.log("http://localhost:"+port);
});
