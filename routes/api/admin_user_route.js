var express = require('express');
var router = express.Router();
var admin_user_Controller = require('../../controllers/_admin/user_mangment_controller');



router.get('/', admin_user_Controller.get_all);
router.post('/', admin_user_Controller.add);
router.get('/:id',admin_user_Controller.get);
router.put('/:id',admin_user_Controller.update);
router.delete('/:id',admin_user_Controller.remove);



module.exports = router;