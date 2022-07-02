const { verifyUser } = require("../middlewares/verifyUser");

exports.homeGetController = async (req, res, next) => {
	const authenticated = verifyUser(req, res, next);
	if (authenticated) {
		return res.render("pages/home", { title: "Home", user: authenticated.user });
	} // forbid the client to access this route when not logged in.

	res.render("pages/home", { title: "Home", user: false });
};
