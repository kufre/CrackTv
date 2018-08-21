var express = require('express');
var router = express.Router();
var category_Controller = require('../../controllers/_admin/category_controller');



router.get('/', category_Controller.get_all);
router.post('/', category_Controller.add);
router.get('/:id',category_Controller.get);
router.put('/:id',category_Controller.update);
router.delete('/:id',category_Controller.remove);



module.exports = router;