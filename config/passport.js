var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var configAuth = require('./auth.js');

module.exports = function(db, passport) {
  passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    db.users.find(id, function(err, res) {
      done(err, res);
    });
  });

  passport.use(new GoogleStrategy({
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            db.users.find({ 'gid' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user[0]) {
                    // if a user is found, log them in
                    return done(null, user[0]);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser = {
                      gid   : profile.id,
                      token : token,
                      name  : profile.displayName,
                      email : profile.emails[0].value // pull the first email
                    };
                    // save the user
                    db.users.save(newUser, function(err, insertedUser) {
                        if (err)
                            throw err;
                        return done(null, insertedUser);
                    });
                }
            });
        });

    }));
}
