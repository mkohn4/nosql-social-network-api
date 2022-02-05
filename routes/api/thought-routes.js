const router = require('express').Router();
const thoughtController  = require('../../controllers/thought-controller');

router.route('/')
    .get(thoughtController.getAllThoughts)
    .post(thoughtController.createThought);

router.route('/:id')
    .get(thoughtController.getThoughtById)
    .put(thoughtController.updateThought);

router.route('/:thoughtId/users/:userId')
    .delete(thoughtController.deleteThought);

router.route('/:thoughtId/reactions')
    .post(thoughtController.addReply);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(thoughtController.deleteReply);

module.exports = router;