const mongoose = require('mongoose');

const skillsData = new mongoose.Schema({
	label: { type: String, default: null },
});

module.exports = mongoose.model('skillsDetails', skillsData);
