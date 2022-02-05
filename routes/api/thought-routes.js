const router = require('express').Router();
const thoughtController  = require('../../controllers/thought-controller');

router.route('/')
    .get(thoughtController.getAllThoughts)
    .post(thoughtController.createThought);

router.route('/:id')
    .get(thoughtController.getThoughtById);


module.exports = router;