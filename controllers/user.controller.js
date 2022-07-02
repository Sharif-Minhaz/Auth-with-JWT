const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { verifyUser } = require("../middlewares/verifyUser");

exports.signupGetController = async (req, res, next) => {
	const authenticated = verifyUser(req, res, next);
	if (authenticated) {
		return res.redirect("/dashboard");
	} // forbid the client to access this route when logged in.

	res.render("pages/signup", { title: "Signup", user: authenticated.user });
};

exports.signupPostController = async (req, res, next) => {
	const { name, email, password, status } = req.body;
	try {
		const authenticated = verifyUser(req, res, next);
		if (authenticated) {
			return res.redirect("/dashboard");
		} // forbid the client to access this route when logged in.

		const saltRound = 10;
		const hashedPassword = await bcrypt.hash(password, saltRound);
		const user = new User({
			name,
			email,
			password: hashedPassword,
			status,
		});

		await user.save();

		res.redirect("/user/login");
	} catch (err) {
		next(err);
	}
};

exports.loginGetController = async (req, res, next) => {
	const authenticated = verifyUser(req, res, next);
	if (authenticated) {
		return res.redirect("/dashboard");
	} // forbid the client to access this route when logged in.

	res.render("pages/login", { title: "Login", user: authenticated.user });
};

exports.loginPostController = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const authenticated = verifyUser(req, res, next);
		if (authenticated) {
			return res.redirect("/dashboard");
		} // forbid the client to access this route when logged in.

		const user = await User.findOne({ email });
		if (user) {
			const isMatched = await bcrypt.compare(password, user.password);
			if (isMatched) {
				const token = jwt.sign(
					{ user: { name: user.name, email: user.email } },
					process.env.JWT_SECRET,
					{ expiresIn: "1h" } // 1 hour
				);
				res.cookie("auth", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
				return res.redirect("/dashboard");
			}
			return res.status(404).json({ message: "Invalid username or password" });
		}

		res.status(404).json({ message: "Invalid username or password" });
	} catch (err) {
		next(err);
	}
};

exports.logoutController = async (req, res, next) => {
	const authenticated = verifyUser(req, res, next);
	if (authenticated) {
		res.clearCookie("auth");
		return res.redirect("/user/login");
	} // forbid the client to access this route when logged in.
	res.status(403).json({ message: "You are not logged in" });
};
