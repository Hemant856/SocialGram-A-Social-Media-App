const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new GithubStrategy({
    clientID: "586f1eaa9ad583047bd4",
    clientSecret: "7ca42440e3ebc27573410023e078d6aff55bab07",
    callbackURL: "http://localhost:8000/users/auth/github/callback"
},
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        //return;

        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) {
                console.log('Error in Google Strategy Passport', err);
                return;
            }
            //console.log(profile);
            if (user) {
                // if found set this user as req.user
                return done(null, user);
            } else {
                // if not found create the user as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if (err) {
                        console.log('Error in creating the user google-strategy-passport', err);
                        return;
                    }
                    return done(null, user);
                });
            }
        });
    }));

module.exports = passport;


