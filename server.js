var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');


var app = express();
const port = process.env.PORT || 3000;


// set view engine 
app.set('view engine', 'ejs');

// Everything in public will be accessible from '/'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'views')));



// basic navigation route
app.get('/',(req,res)=>{
    res.render('index',{title: 'Hello from render'});
});

app.get('/contact-us',(req,res)=>{
    res.render('contact-us',{title: 'Hello from render'});
});

app.get('/about-us',(req,res)=>{
    res.render('about-us',{title: 'Hello from render'});
});

app.get('/terms-of-use',(req,res)=>{
    res.render('terms-of-use',{title: 'Hello from render'});
});

app.get('/faq',(req,res)=>{
    res.render('faq',{title: 'Hello from render'});
});

app.get('/privacy-policy',(req,res)=>{
    res.render('privacy-policy',{title: 'Hello from render'});
});



// account Route
app.get('/register',(req,res)=>{
    res.render('account/register',{title: 'Hello from render'});
});
app.get('/Login',(req,res)=>{
    res.render('account/login',{title: 'Hello from render'});
});
app.get('/reset_password',(req,res)=>{
    res.render('account/password_reset',{title: 'Hello from render'});
});



// Movies Route
app.get('/trailers',(req,res)=>{
    res.render('movies/trailers',{title: 'Hello from render'});
});
app.get('/trailers/id',(req,res)=>{
    res.render('movies/trailer-detail',{title: 'Hello from render'});
});
app.get('/upcoming',(req,res)=>{
    res.render('movies/upcoming-movie',{title: 'Hello from render'});
});
app.get('/cenima',(req,res)=>{
    res.render('movies/cenima',{title: 'Hello from render'});
});





app.listen(port, ()=>{
    console.log("server started at port:"+port);
});
