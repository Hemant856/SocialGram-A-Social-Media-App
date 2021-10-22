const post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
  // console.log(req.cookies);

  // post.find({}, function(err, posts){
  //     return res.render('home',{
  //         title: "Codeial | Home",
  //         posts: posts
  //      });
  // })
  try {
    // Populte the user of each post
    let posts = await post.find({})
    .sort('-createdAt')
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      });


    let users = await User.find({});

    return res.render('home', {
      title: "SocialGram | Home",
      posts: posts,
      all_users: users
    });
  } catch(err) {
     console.log('Error', err);
     return;
  }



}

