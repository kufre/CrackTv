var express = require('express');
var bodyparser = require('body-parser');


var app = express();
const port = 3000;


// set view engine 
app.set('view engine', 'ejs');



// use res.render to load up an ejs view file 
app.get('/',(req,res)=>{
    res.render('index',{title: 'Hello from render'});
});

// account Route
app.get('/account/register',(req,res)=>{
    res.render('account/register',{title: 'Hello from render'});
});
app.get('/account/Login',(req,res)=>{
    res.render('account/register',{title: 'Hello from render'});
});
app.get('/account/Login',(req,res)=>{
    res.render('account/password_reset',{title: 'Hello from render'});
});





app.listen(port, ()=>{
    console.log("server started at port:"+port);
});
