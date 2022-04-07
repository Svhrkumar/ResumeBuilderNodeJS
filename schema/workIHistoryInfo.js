const mongoose = require('mongoose');

const workHistorySchema = new mongoose.Schema({
	userId: { type: String, required: true },
	workHistoryInfo: [
		{
			workId: { type: String, required: true },
			startDate: { type: String, required: true },
			endDate: { type: String, required: true },
			companyName: { type: String, required: true },
			location: { type: String, required: true },
			role: { type: String, required: true },
			clientName: { type: String, required: true },
			projectName: { type: String, required: true },
			description: { type: String, required: true },
			technologies: { type: String, required: false },

			task1: { type: String, required: false },
			task2: { type: String, required: false },
			task3: { type: String, required: false },
			task4: { type: String, required: false },
			task5: { type: String, required: false },
		},
	],
});

module.exports = mongoose.model('workhistoryinfo', workHistorySchema);
