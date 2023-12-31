const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth2");

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log("##########################################");
      console.log("##########################################");
      console.log("##########################################");
      console.log(profile);
      console.log("##########################################");
      console.log("##########################################");
      console.log("##########################################");
      console.log("accessToken :");
      console.log(accessToken);
      console.log("refreshToken :");
      console.log(refreshToken);
      return done(null, profile);
    }
  )
);
