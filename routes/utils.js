
exports.ensureAuthenticated = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    next();
  }
}

exports.jumpToProfile = function(req, res, next) {
  // only add this to homepage
  if (req.isAuthenticated()) {
    res.redirect('/profile');
  } else {
    next();
  }
}
