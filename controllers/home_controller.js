const post = require('../models/post');
const User = require('../models/user');
const Friendship = require('../models/friendship')
const Notes = require('../models/note')

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
    let notes = await Notes.find({});
    let posts = await post.find({})
    .sort('-createdAt')
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      }).populate('likes');


      let users = await User.find({});
        let friends = new Array();
        if (req.user) {
            let all_friendships = await Friendship.find({ $or: [{ from_user: req.user._id }, { to_user: req.user._id }] })
                .populate('from_user')
                .populate('to_user')

            for (let fs of all_friendships) {
                if (fs.from_user._id.toString() == req.user._id.toString()) {
                    friends.push({
                        friend_name: fs.to_user.name,
                        friend_id: fs.to_user._id,
                        friend_avatar: fs.to_user.avatar,
                    })
                } else if (fs.to_user._id.toString() == req.user._id.toString()) {
                    friends.push({
                        friend_name: fs.from_user.name,
                        friend_id: fs.from_user._id,
                        friend_avatar: fs.from_user.avatar,
                    })
                }
            }
        }

    return res.render('home', {
      title: "SocialGram | Home",
      posts: posts,
      all_users: users,
      friends: friends,
      personal_notes : notes
    });
  } catch(err) {
     console.log('Error', err);
     return;
  }


}

module.exports.aboutUs = function(req, res) {
    return res.render('about_us', {
        title: "SocialGram | About Us"
    })

}

