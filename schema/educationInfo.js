const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	educationInfo: [
		{
			eduId: { type: String, required: true },
			degreeSchoolName: { type: String, required: true },
			degreeDegreeType: { type: String, required: true },
			degreeFromDate: { type: String, required: true },
			degreeToDate: { type: String, required: true },
			degreeAchievements: { type: String, required: false },
		},
	],
});
module.exports = mongoose.model('educationDetails', educationSchema);
