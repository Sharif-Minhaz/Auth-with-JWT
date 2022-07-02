const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const middlewares = [
	cors(),
	express.static("public"),
	cookieParser(),
	express.urlencoded({ extended: true }),
	express.json(),
];

module.exports = (app) => {
	app.use(middlewares);
};
