const express = require('express');
const resumeDetails = express.Router();
const skillsData = require('../schema/skillsData');
const data = require('../skills.json');
const expressAsyncHandler = require('express-async-handler');
resumeDetails.post(
	'/seed',
	expressAsyncHandler(async (req, res) => {
		console.log(req.body);
		const createdSkills = await skillsData.insertMany(data);
		res.send(createdSkills);
	})
);

resumeDetails.get(
	'/skills',
	expressAsyncHandler(async (req, res) => {
		const skillsList = await skillsData.find();
		res.send(skillsList);
	})
);
resumeDetails.get('/', (req, res) => {
	res.status(200).send('Heloo Raghav');
});

module.exports = resumeDetails;
