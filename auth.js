const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const fs = require("fs");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "658696757080-5hschn36n8jkpn80ssk1okfh1b7i2hd5.apps.googleusercontent.com",
      clientSecret: "6qFj-sAK09ZIQp7gAh6yytsA",
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    function (request, accessToken, refreshToken, profile, done) {
      //Reading the current users file
      var emailsObject = JSON.parse(fs.readFileSync("users.json", "utf8"));

      //Checks if email already exists if not exists email is added in file
      if (!emailsObject.emails.includes(profile.email)) {
        emailsObject.emails.push(profile.email);
        fs.writeFile(
          "./users.json",
          JSON.stringify(emailsObject),
          "utf-8",
          function (err) {
            if (err) throw err;
            console.log("Done");
          }
        );
      }

      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
