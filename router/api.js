const express = require('express');
const router = express();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['email']
}))

router.get('/google/cb', passport.authenticate('google'),
    function (req, res) {
        res.render('chat', {
            user: req.user
        });
    });

router.get('/fb', passport.authenticate('facebook'));

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    res.render('chat', {
        user: req.user
    });
})
module.exports = router;