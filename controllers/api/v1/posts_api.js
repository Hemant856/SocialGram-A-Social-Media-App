// const Post = require('../../../models/post');
// const Comment = require('../../../models/comment');

// module.exports.index = async function(req, res){

//     let posts = await Post.find({})
//     .sort('-createdAt')
//       .populate('user')
//       .populate({
//         path: 'comments',
//         populate: {
//           path: 'user'
//         }
//       });



//     return res.json(200, {
//         message: "List of posts",
//         posts: posts
//     })
// }

// module.exports.destroy = async function (req, res) {


//     try {
//         let post = await Post.findById(req.params.id);

//         //.id means converting the object id into string
//        if (post.user == req.user.id) {
//             post.remove();

//             await Comment.deleteMany({ post: req.params.id });
            
//             return res.json(200, {
//                 message: "Post and Associated comments Deleted Successfully"
//             });
//         }else{
//             return res.json(401, {
//                 message: "You cannot delete this post"
//             });
//         }

//         } catch (err) {
//             console.log(err);
//             return res.json(500, {
//                 message: "Internal Server Error11",
//                 err: err,
//                  //sent: req
//             });
//         }
//     }



const Post = require('../../../models/post');
const Comment = require('../../../models/comment')
module.exports.index = async function(req, res) {
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    return res.json(200, {
        message: "Lists of Posts",
        posts: posts
    })
}
module.exports.destroy = async function(req, res) {
    // return res.json(500, {
    //     message: req
    // });
    try {
        let post = await Post.findById(req.params.id);
        // .id  - converting the object id into string
        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id });

            return res.json(200, {
                    message: "Post and Associated comments Deleted Successfully"
                })
                // return res.redirect('back');
        } else {
            return res.json(401, {
                message: 'You cannot delete this post'
            })
        }
    } catch (err) {
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}