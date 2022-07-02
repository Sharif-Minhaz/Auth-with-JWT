const jwt = require("jsonwebtoken");

exports.verifyUser = (req, res, next) => {
	try {
		if (req.cookies?.auth) {
			return jwt.verify(req.cookies.auth, process.env.JWT_SECRET);
		}
		return false;
	} catch (err) {
		next(err);
	}
};
