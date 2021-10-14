const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res) {

    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user.id
            });
            post.comments.push(comment);
            post.save();
            
            req.flash('success', 'Comment Added Successfully');
            res.redirect('/');
        }
    } catch (err) {
        console.log('Error', err);
        return;
    }


}


module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;

            comment.remove();

          
            let post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            req.flash('success', 'Comment Deleted Successfully');
            return res.redirect('back');
        }
        else {
            req.flash('error', 'Comment not added');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error', err);
        return;
    }


}