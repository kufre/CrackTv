var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');


var app = express();
const port = process.env.PORT || 7000;



var router = require('./routes/main_route');

var api = require('./routes/api_route');





// set view engine 
app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Everything in public will be accessible from '/'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'views')));


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






app.listen(port, ()=>{
    console.log("http://localhost:"+port);
});
