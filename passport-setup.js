const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FBStrategy = require('passport-facebook').Strategy;

// Once the user has been authenticated this function will be called.
passport.serializeUser(function(user, done) {
    // console.log(user);
    done(null, user);
    // Reason behind sending only the user id is making the cookies smaller
    // It sends the cookie to the browser
});

passport.deserializeUser(function(user, done) {
    // Whenever the browser requests, it sends the cookie back to the server with the info we provide.
    // With that info we can decrypt and fetch the user with the help of this method..
    // console.log(user);
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: '816210632198-84pbmnrq6t02tl4akfikb8innh94l4sv.apps.googleusercontent.com',
    clientSecret: 'DjAxfJwiTBkilZzkA-97TFKv',
    callbackURL: "http://localhost:3000/login/callback/google"
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log(profile);
    // save the user to mongodb..
    // done - go to the next stage..
    return done(null, profile);
  }
));

passport.use(new FBStrategy({
  clientID: '631039221140152',
  clientSecret: 'f580103cc9f9bd476edbdc91df00d62c',
  callbackURL: "http://localhost:3000/login/callback/facebook",
  profileFields: ['id', 'displayName', 'email']
},
function(accessToken, refreshToken, profile, done) {
  // console.log(profile);
  return done(null, profile);
}
));