// This will control many users

const User = require('../models/user');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

module.exports.profile = function(req, res){
  User.findById(req.params.id, function(err, user){
       // res.end('<h1> User Profile</h1>');
    return res.render('user_profile',{
      title: "User Profile",
      profile_user: user
   }); 
  });
    
}

module.exports.update = async function(req, res) {
  // if (req.user.id == req.params.id) {
  //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
  //         req.flash('success', '😍 Profile Updated')
  //         return res.redirect('back');
  //     })
  // } else {
  //     res.flash('error', 'Unauthorized')
  //     return res.status(401).send('Unauthorized');

  // }
  if (req.user.id == req.params.id) {


      try {
          let user = await User.findById(req.params.id);
          User.uploadedAvatar(req, res, function(err) {
              if (err) {
                  console.log('*********Multer Error: ', err);

              }
              console.log(req.file);
              user.name = req.body.name;
              user.email = req.body.email;

              if (req.file) {
                  // this is saving the path of the uploaded file into the avatar field int the user
                  if (user.avatar) {
                    if (fs.existsSync(path.join(__dirname, '..', user.avatar))) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                }
                
                  user.avatar = User.avatarPath + '/' + req.file.filename
              }
              user.save();
              return res.redirect('back');

           })

      } catch (err) {
          req.flash('error', err);
          return res.redirect('back');
      }
  } else {
      res.flash('error', 'Unauthorized')
      return res.status(401).send('Unauthorized');
  }

}

// render the sign up page
module.exports.signUp = function(req, res){

  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_up',{
    title: "SocialGram | Sign Up"
  })
}

// render the sign in page
module.exports.signIn = function(req, res){
   
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_in', {
    title: "SocialGram | Sign In"
  });
}

// get the sign up data

module.exports.create = function(req, res){
  if (req.body.password != req.body.confirm_password){
     return res.redirect('back');
    //return res.redirect('/users/sign-in');
  }

  User.findOne({email: req.body.email}, function(err, user){
    if(err){
      req.flash('error', 'Error in finding the user from the database')
      return res.redirect('back');
      }

    if(!user){
      User.create(req.body, function(err, user){
        if(err){
          req.flash('error', 'An error occurred while creating the account!');

          return res.redirect('back'); }
        
        req.flash('success', 'New account created Successfully');
        return res.redirect('/users/sign-in');
      })
    }
    else{
      req.flash('error', 'User already exists!');
      return res.redirect('back');
    }
  });
}

// sign in and create a session for user 
module.exports.createSession = function(req, res){
  req.flash('success', 'Logged in successfully');
  return res.redirect('/');
  
  
  
  // // Find the User 
  //  User.findOne({email: req.body.email}, function(err, user){
  //   if(err){console.log('error in finding user in signing in'); return}
   
  //    //handle user found
  //    if(user){
  //      //handle password which doesn't match
  //      if(user.password != req.body.password){
  //         return res.redirect('back');
  //      }

  //      // handle session creation
  //      res.cookie('user_id', user.id);
  //      return res.redirect('/users/profile');

  //    }
  //    else{
  //       //handle user not found
  //       return res.redirect('back');
  //    }
    

  //  });

 
}


module.exports.destroySession = function(req, res){
  req.logout();
  req.flash('success', 'You have logged out!');
  return res.redirect('/users/sign-in');
}
