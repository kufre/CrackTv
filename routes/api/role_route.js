var express = require('express');


var router = express.Router();

var role_Controller = require('../../controllers/_admin/role_controller');

router.get('/', role_Controller.get_all_role);
router.post('/', role_Controller.add_role);
router.get('/:id',role_Controller.get_role);
router.put('/:id',role_Controller.update_update);
router.delete('/:id',role_Controller.remove_role);



module.exports = router;