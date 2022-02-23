const express = require('express');
const resumeDetails = express.Router();
const skillsDetails = require('../schema/skillsData');
const data = require('../skills.json');
const expressAsyncHandler = require('express-async-handler');
resumeDetails.post(
	'/seed',
	expressAsyncHandler(async (req, res) => {
		console.log(req.body);
		const createdSkills = await skillsdetails.insertMany(data);
		res.send(createdSkills);
	})
);

resumeDetails.get(
	'/skills',
	expressAsyncHandler(async (req, res) => {
		const skillsList = await skillsDetails.find();
		res.send(skillsList);
	})
);
resumeDetails.get('/', (req, res) => {
	res.status(200).send('Heloo Raghav');
});

module.exports = resumeDetails;
