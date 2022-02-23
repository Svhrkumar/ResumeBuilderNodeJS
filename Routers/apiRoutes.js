const express = require('express');
const resumeDetails = express.Router();
const skillsDetails = require('../schema/skillsData');
const data = require('../skills.json');
const expressAsyncHandler = require('express-async-handler');
resumeDetails.post(
	'/seed',
	expressAsyncHandler(async (req, res) => {
		console.log(req.body);
		const createdSkills = await skillsDetails.insertMany(data);
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

module.exports = resumeDetails;
