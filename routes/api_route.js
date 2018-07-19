var express = require('express');

var router = express.Router();
var movie_type = require('./api/movie_type.route');
var account_register_router = require('./api/register_router');
var account_login_router = require('./api/login_router');


router.use('/movie_type', movie_type);
router.use('/register', account_register_router);
router.use('/login', account_login_router);


module.exports = router;      