const homeRoute = require("./home.route");
const userRoute = require("./user.route");
const dashboardRoute = require("./dashboard.route");

const routes = [
	{
		path: "/",
		handler: homeRoute,
	},
	{
		path: "/user",
		handler: userRoute,
	},
	{
		path: "/dashboard",
		handler: dashboardRoute,
	},
];

module.exports = (app) => {
	routes.forEach((singleRoute) => {
		app.use(singleRoute.path, singleRoute.handler);
	});
};
