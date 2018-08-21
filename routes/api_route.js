var express = require('express');

var router = express.Router();
var movie_type = require('./api/movie_type.route');
var account_register_router = require('./api/register_router');
var account_login_router = require('./api/login_router');
var role_router = require('./api/role_route');
var category_router = require('./api/category_route');
var admin_user_router = require('./api/admin_user_route');



router.use('/movie_type', movie_type);
router.use('/register', account_register_router);
router.use('/login', account_login_router);
router.use('/role', role_router);
router.use('/category', category_router);
router.use('/movie', category_router);
router.use('/user_setup', admin_user_router);


module.exports = router;      