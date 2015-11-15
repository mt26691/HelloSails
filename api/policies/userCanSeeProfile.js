
module.exports = function (req, res, next) {
	var sessionUserIsMath = req.session.User.id === req.param("id");
	var isAdmin = req.session.User.admin;

	if (!(sessionUserIsMath || isAdmin)) {
		var notrightEnough = [{ name: "notrightEnough", message: "You don't have enough previlege to access this page" }];
		req.session.flash =
		{
			err: notrightEnough
		}
		res.redirect("/session/new/");
		return;
	}
	next();
};
