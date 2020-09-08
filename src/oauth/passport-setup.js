const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FBStrategy = require('passport-facebook').Strategy;
var GoauthConfig = require('./config/google.json');
var FBoauthConfig = require('./config/fb.json');

// Once the user has been authenticated this function will be called.
passport.serializeUser(function (user, done) {
  // console.log(user);
  done(null, user);
  // Reason behind sending only the user id is making the cookies smaller
  // It sends the cookie to the browser
});

passport.deserializeUser(function (user, done) {
  // Whenever the browser requests, it sends the cookie back to the server with the info we provide.
  // With that info we can decrypt and fetch the user with the help of this method..
  // console.log(user);
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: GoauthConfig.web.client_id,
  clientSecret: GoauthConfig.web.client_secret,
  callbackURL: GoauthConfig.web.redirect_uris[0]
},
  function (accessToken, refreshToken, profile, done) {
    // console.log(profile);
    // save the user to mongodb..
    // done - go to the next stage..
    return done(null, profile);
  }
));

passport.use(new FBStrategy({
  clientID: FBoauthConfig.web.client_id,
  clientSecret: FBoauthConfig.web.client_secret,
  callbackURL: FBoauthConfig.web.redirect_uris[0],
  profileFields: FBoauthConfig.web.profileFields
},
  function (accessToken, refreshToken, profile, done) {
    // console.log(profile);
    return done(null, profile);
  }
));