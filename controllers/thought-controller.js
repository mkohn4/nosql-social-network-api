const {Thought, User} = require('../models');

const thoughtController = {
    getAllThoughts(req,res) {
        Thought.find({})
        .then(response => res.json(response))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'no thought found with this id'});
                    return;
                }
                res.json(dbThoughtData);
            }).catch(err => console.log(err));
    },
    createThought({body}, res) {
        Thought.create(body)
            .then(({_id}) => {
                console.log(_id);
                return User.findOneAndUpdate(
                    {_id: body.userId},
                    {$push: {thoughts: _id}},
                    {new: true}
                )
            }).then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'no user with this id found'});
                    return;
                }
                res.json(dbUserData);
            }).catch(err => res.json(err));
    }
        
}

module.exports = thoughtController;