var express = require('express');
// Router object from express, using to do all the routing.
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

console.log('Configuring authentication...');

// passport config
var User = require('../../common/models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


router.get('/register', function(req, res) {
  console.log('Register GET');
  res.send('register!');
});

router.post('/register', function(req, res) {
  console.log('Register requested: ' + req.body.username + '::' + req.body.password);

  User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {

    if (err) {
      console.log('Error registering: ' + err);
    }
    else {
      console.log('User created succesfully. Authenticating...');
      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
    }
  });
});

// router.get('/login', function(req, res) {
//     res.render('login', { user : req.user });
// });

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('Login as user: ' + req.user);
  res.redirect('/');
});


router.get('/logout', function(req, res) {
  console.log('Logout requested, logging out...');
  req.logout();
  res.redirect('/');
});

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});

module.exports = router;