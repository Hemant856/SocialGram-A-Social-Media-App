const post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req, res){
    // console.log(req.cookies);

    // post.find({}, function(err, posts){
    //     return res.render('home',{
    //         title: "Codeial | Home",
    //         posts: posts
    //      });
    // })


  // Populte the user of each post
    post.find({})
    .populate('user')
    .populate({
      path: 'comments',
      populate: {
        path: 'user'
      }
    })
    .exec(function(err, posts){
      User.find({}, function(err, users){
        return res.render('home',{
          title: "Codeial | Home",
          posts: posts,
          all_users: users
       });
      })
       
    })
    
}

