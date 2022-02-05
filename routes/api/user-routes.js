const router = require('express').Router();
const userController  = require('../../controllers/user-controller');

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

    
router.route('/:id').get(userController.getUserById);

module.exports = router;