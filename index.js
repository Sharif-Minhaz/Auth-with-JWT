require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const setMiddlewares = require("./middlewares/middleware");
const setRoutes = require("./routes/route");

app.set("view engine", "ejs");

setMiddlewares(app);
setRoutes(app);

const port = process.env.PORT || 8080;
mongoose
	.connect(process.env.DB_URL)
	.then(() => {
		app.listen(port, () => {
			console.log(`Server running at http://localhost:${port}`);
		});
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
