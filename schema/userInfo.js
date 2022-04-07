const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const userInfoSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	email: { type: String, required: true },
	contact: { type: String, required: true },
	city: { type: String, required: true },
	pincode: { type: String, required: true },
	website: { type: String, required: false },
	linkedIn: { type: String, required: false },
	gitHub: { type: String, required: false },
	languages: [
		{
			langId: { type: String, required: false },
			language: { type: String, required: false },
		},
	],
	role: { type: String, required: true },
	careerObjective: { type: String, required: true },
});

module.exports = mongoose.model('userinfo', userInfoSchema);
