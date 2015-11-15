
module.exports = function (req, res, next) {
	
  if (req.session.User && req.session.User.admin) {
    return next();
  }
  else {
    var requiredAdmin = [{ name: "requireAdmin", message: "You don't have enough previlege to access this page" }];
    req.session.flash =
    {
      err: requiredAdmin
    }
    res.redirect("/session/new/");
    return;
  }

};
