const mongoose = require('mongoose');

const technicalInfoSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	userCertifications: [
		{
			certificateId: { type: String, required: true },
			completedYear: { type: String, required: true },
			certificateName: { type: String, required: true },
			certificationPartner: { type: String, required: true },
		},
	],

	userExpTools: [
		{
			toolId: { type: String, required: true },
			toolName: { type: String, required: true },
		},
	],
	userExpSkills: [
		{
			skillId: { type: String, required: true },
			skillName: { type: String, required: true },
		},
	],

	userAchivements: [
		{
			achId: { type: String, required: true },
			achName: { type: String, required: true },
		},
	],
});

module.exports = mongoose.model('technicalInfo', technicalInfoSchema);
