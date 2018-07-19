var express = require('express');
var router = express.Router();

/// GET  USER CONTTROLLER

var accountController = require('../../controllers/account_controller');

router.post('/',accountController.login);








module.exports = router