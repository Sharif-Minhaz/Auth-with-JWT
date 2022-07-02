const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: ["active", "inactive"],
	},
});

const User = model("user", userSchema);

module.exports = User;
