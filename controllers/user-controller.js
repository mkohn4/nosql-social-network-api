const { User } = require('../models');

const userController = {
    //get all users
    getAllUsers(req,res) {
        User.find({})
            .then(response => res.json(response))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getUserById({params}, res) {
        User.findOne({_id: params.id})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No user with this id found'});
                    return;
                }
                res.json(dbUserData);
            }).catch(err => console.log(err));
    },
    createUser({body}, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new:true, runValidators: true})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'no user found with thiis id'});
                    return;
                }
                res.json(dbUserData);
            }).catch(err => console.log(err));
    },
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'no user with this id found'});
                    return;
                }
                res.json(dbUserData);
            }).catch(err => console.log(err));
    }
}

module.exports = userController;