const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
const User = require('../models/user')


module.exports.create = async function (req, res) {
    try {
        //console.log(req.user);
        let new_post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        let post = await Post.findById(new_post._id).populate('user');
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post_id: post._id,
                    user_name: post.user.name,
                    post_content: post.content,
                    updatedAt: post.updatedAt,
                    createdAt: post.createdAt,
                    avatar: post.user.avatar,
                },
                message: 'Post Created!'
            });
        }
        req.flash('success', 'Post published!');
        return res.redirect('back');
    } catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }


}


module.exports.destroy = async function (req, res) {


    try {
        let post = await Post.findById(req.params.id);

        //.id means converting the object id into string
        if (post.user == req.user.id) {

             // change like delete the associated like for the post and all its comment likes to
             await Like.deleteMany({ likeable: post, onModel: 'Post' });
             await Like.deleteMany({ _id: { $in: post.comments } });

            post.remove();

            await Comment.deleteMany({ post: req.params.id });
            

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: 'post Deleted!'
                })
            }
            req.flash('success', 'Post ans associated comments deleted!');

            return res.redirect('back');
        }
        else {
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }
    } catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }

}