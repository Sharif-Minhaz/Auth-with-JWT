const { verifyUser} = require("../middlewares/verifyUser");

exports.dashboardGetController = async (req, res, next) => {
	const authenticated = verifyUser(req, res, next);
	if (!authenticated) {
		return res.redirect("/user/login");
	} // forbid the client to access this route when not logged in.

	res.render("pages/dashboard", { title: "Dashboard", user: authenticated.user });
};
