module.exports = function(app, passport, db) {

  // app.get('/login', function(req, res) {
  //   res.render('login', {message: req.flash('loginMessage') });
  // });
  //
  // app.get('/signup', function(req, res) {
  //   res.render('signup', {message: req.flash('signupMessage') });
  // });

  app.get('/profile', isLoggedIn, function(req, res) {
    db.topics.find({author_id: req.user.id}, function(err, topics){
      if(err) throw err;

      res.render('profile', {
        user: req.user,
        topics: topics
      });
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));
};

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}
