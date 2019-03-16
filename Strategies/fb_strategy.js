var passport = require("passport");
var FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const Person = mongoose.model("myperson");
// const keys = require('../config/setup')

passport.use(new FacebookStrategy({
        clientID: keys.fb.client_id || process.env.FB_CLIENT_ID,
        clientSecret: keys.fb.client_secret || process.env.FB_CLIENT_SECRET,
        callbackURL: "/auth/facebook/redirect"
    },
    function (accessToken, refreshToken, profile, cb) {
        // Person.find({
        //     facebookId: profile.id
        // }, function (err, user) {
        //     return cb(err, user);
        // });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    Person.findById(id)
        .then(person => {
            done(null, person)
        })
        .catch(() => {
            console.log('error');
        })
});