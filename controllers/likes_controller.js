const Post = require('../models/post')
const Comment = require('../models/comment')
const Like = require('../models/like');
const User = require('../models/user');
const { response } = require('express');

module.exports.toggleLike = async function(req, res) {
    try {

        // likes/toggle/?id=abcdeef&type=post
        let likeable;
        let deleted = false;

        if (req.query.type == 'Post') {
            likeable = await Post.findById(req.query.id).populate('likes')
        } else {
            likeable = await Comment.findById(req.query.id).populate('likes')
        }

        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })

        // if a like is already exists than delete it
        if (existingLike) {
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted = true;
        } else {
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike);
            likeable.save();
        }
        return res.status(200).json({
            message: 'Request Successful',
            data: {
                deleted: deleted
            }
        })

    } catch (error) {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}