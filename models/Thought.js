const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
        getters: true
    }
})


const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReplySchema]
},
{
    toJSON: {
        getters: true,
        virtuals: true
    }
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

