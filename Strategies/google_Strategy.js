var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require('mongoose');
const Person = mongoose.model("myperson");
const keys = require('../config/setup')

passport.use(
    new GoogleStrategy({
            clientID: keys.google.client_id || process.env.GOOGLE_CLIENT_ID,
            clientSecret: keys.google.client_secret || process.env.GOOGLE_CLIENT_KEY,
            callbackURL: "/auth/google/cb"
        },
        function (accessToken, refreshToken, profile, cb) {
            // console.log(profile);

            Person.findOne({
                    googleID: profile.id
                })
                .then(person => {
                    if (!person) {
                        const newPerson = new Person({
                            name: profile.displayName,
                            googleID: profile.id
                        })
                        newPerson.save()
                            .then((person) => {
                                cb(null, person);
                            })
                            .catch(console.log('fail success'))
                    } else {
                        return cb(null, person);
                    }
                })
        }));

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