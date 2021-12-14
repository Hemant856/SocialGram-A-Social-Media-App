const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
    // this defines the object id of the liked objects
    likeable: {
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel'

    },
    // this field 
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    },
}, {
    timestamps: true
})

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;