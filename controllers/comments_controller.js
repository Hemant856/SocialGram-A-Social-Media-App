const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
  Post.findById(req.body.post, function(err, post){
      if(post){
          Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user.id
          }, function(err, comment){
              if(err){console.log("error in commenting"); return;}
              post.comments.push(comment);
              post.save();

              res.redirect('/');
          });
      }
  });
}