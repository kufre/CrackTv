var express = require('express');


var router = express.Router();

var MovieType_Controller = require('../../controllers/movie_type_controller');

router.get('/', MovieType_Controller.getAllMovieType);
router.post('/', MovieType_Controller.addMovieType);
router.get('/:id',MovieType_Controller.getMovieType);
router.put('/:id',MovieType_Controller.updateMovieType);
router.delete('/:id',MovieType_Controller.removeMovieType);



module.exports = router;