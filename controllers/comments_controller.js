const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res) {

    try {
        //console.log(req);
        let post = await Post.findById(req.body.post);
        if (post) {
            let new_comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user.id
            });
            post.comments.push(new_comment);
            post.save();

            let comment = await Comment.findById(new_comment._id)
            .populate('user')
            .populate('post');


        if (req.xhr) {
            console.log(comment);
            return res.status(200).json({
                data: {
                    comment_id: comment._id,
                    user_name: comment.user.name,
                    comment_content: comment.content,
                    post_id: comment.post._id,
                },
                message: 'Comment Created!',
            })
        }
            
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


            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: comment._id
                    },
                    message: 'Comment Deleted!'
                })
            }

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