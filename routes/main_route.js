var express = require('express');
var router = express.Router();





router.get('/',(req, res)=>{
    res.render('index',{title: 'Hello from render'});
});
router.get('/contact-us',(req,res)=>{
    res.render('contact-us',{title: 'Hello from render'});
});

router.get('/about-us',(req,res)=>{
    res.render('about-us',{title: 'Hello from render'});
});

router.get('/terms-of-use',(req,res)=>{
    res.render('terms-of-use',{title: 'Hello from render'});
});

router.get('/faq',(req,res)=>{
    res.render('faq',{title: 'Hello from render'});
});

router.get('/privacy-policy',(req,res)=>{
    res.render('privacy-policy',{title: 'Hello from render'});
});



// account Route
router.get('/register',(req,res)=>{
    res.render('_account/register',{title: 'Hello from render'});
});
router.get('/Login',(req,res)=>{
    res.render('_account/login',{title: 'Hello from render'});
});
router.get('/reset_password',(req,res)=>{
    res.render('_account/password_reset',{title: 'Hello from render'});
});



// Movies Route
router.get('/trailers',(req,res)=>{
    res.render('trailers',{title: 'Hello from render'});
});
router.get('/trailers/id',(req,res)=>{
    res.render('trailer-detail',{title: 'Hello from render'});
});
router.get('/upcoming',(req,res)=>{
    res.render('coming_soon',{title: 'Hello from render'});
});
router.get('/cenima',(req,res)=>{
    res.render('in_cenimas',{title: 'Hello from render'});
});


router.get('/admin/login',(req,res)=>{
    res.render('_admin/login');
});

//  BACKEND ROUTE
router.get('/admin',(req, res)=>{
    res.render('_admin/index',{title: 'Hello from render'});
});


//MARK SETUP ROUTE
router.get('/admin/setup',(req, res)=>{
    res.render('_admin/_setup/index',{title: 'Hello from render'});
});

router.get('/admin/user_setup',(req, res)=>{
    res.render('_admin/_setup/user_setup',{title: 'Hello from render'});
});

router.get('/admin/role_setup',(req, res)=>{
    res.render('_admin/_setup/role_setup',{title: 'Hello from render'});
});

router.get('/admin/category_setup',(req, res)=>{
    res.render('_admin/_setup/category_setup',{title: 'Hello from render'});
});



//MARK UPLOAD ROUTE
router.get('/admin/upload',(req, res)=>{
    res.render('_admin/_upload/index',{title: 'Hello from render'});
});

router.get('/admin/movie_upload',(req, res)=>{
    res.render('_admin/_upload/movie_upload',{title: 'Hello from render'});
});

router.get('/admin/movie_allocation',(req, res)=>{
    res.render('_admin/_upload/movie_allocation',{title: 'Hello from render'});
});

router.get('/admin/approval',(req, res)=>{
    res.render('_admin/_approval/index',{title: 'Hello from render'});
});






router.get('/backend/approval',(req, res)=>{
    res.render('_backend/index',{title: 'Hello from render'});
});

router.get('/backend/report',(req, res)=>{
    res.render('_backend/index',{title: 'Hello from render'});
});






module.exports = router;