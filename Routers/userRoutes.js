const express = require('express');
const userDetails = express.Router();
const expressAsyncHandler = require('express-async-handler');
const userdatas = require('../schema/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const userInfo = require('../schema/userInfo');
const educationDetails = require('../schema/educationInfo');
const workhistoryinfo = require('../schema/workIHistoryInfo');
const technicalInfo = require('../schema/technicalInfo');
console.log(process.env.SECRET_KEY);

userDetails.post('/register', async (req, res) => {
	try {
		const { firstname, lastname, RegEmail, RegPassword, contact, country } =
			req.body;
		if (!(RegEmail && RegPassword && firstname && lastname && contact)) {
			res.status(400).send('All fields are required');
		}
		const existingUser = await userdatas.findOne({ email: RegEmail });
		if (existingUser) {
			res.status(401).send('User Already existed');
		}
		const myEncryptPass = await bcrypt.hash(RegPassword, 10);
		const user = await userdatas.create({
			firstname: firstname,
			lastname: lastname,
			email: RegEmail.toLowerCase(),
			password: myEncryptPass,
			contact: contact,
			country: country,
		});
		//token
		const token = jwt.sign(
			{ user_id: user.__id, RegEmail },
			process.env.SECRET_KEY,
			{
				expiresIn: '4h',
			}
		);
		user.token = token;
		res.status(201).json(user);
		console.log(req.body);
	} catch (err) {
		console.log(err);
	}
});

userDetails.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		console.log(req.body);
		if (!(email && password)) {
			res.status(400).send('Field is missing');
		}
		const user = await userdatas.findOne({ email });
		console.log(user);

		// if (!user) {
		// 	res.status(401).send('you are not authorized');
		// }
		console.log(password);
		// const passCompare = ;
		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign(
				{
					user_id: user._id,
					email,
				},
				process.env.SECRET_KEY,
				{
					expiresIn: '4h',
				}
			);
			user.token = token;
			user.password = undefined;
			res.status(200).json(user);
		}

		res.status(400).send('email or password is incorrect');
	} catch (err) {
		console.log(err);
	}
});
userDetails.post('/userpersonalinfo', async (req, res) => {
	try {
		const {
			firstname,
			lastname,
			email,
			contact,
			pincode,
			userId,
			city,
			website,
			linkedIn,
			gitHub,
			languages,
			role,
			careerObjective,
		} = req.body;

		if (
			!(
				firstname &&
				lastname &&
				contact &&
				email &&
				pincode &&
				userId &&
				city &&
				role &&
				careerObjective &&
				userId
			)
		) {
			res.status(400).send('some mandatory fields are missing');
		}

		const createdData = await userInfo.create({
			userId: userId,
			firstname: firstname,
			lastname: lastname,
			email: email,
			contact: contact,
			city: city,
			pincode: pincode,
			website: website,
			linkedIn: linkedIn,
			gitHub: gitHub,
			languages: languages,
			role: role,
			careerObjective: careerObjective,
		});
		console.log(createdData);

		res.status(201).json(createdData);
	} catch (err) {
		console.log(err);
	}
});

userDetails.put('/personalinfo/update/', async (req, res) => {
	try {
		const {
			firstname,
			lastname,
			email,
			contact,
			pincode,
			userId,
			city,
			website,
			linkedIn,
			gitHub,
			languages,
			role,
			careerObjective,
		} = req.body;
		if (!userId) {
			res.status(400).send('Bad Request - UserID is mandatory');
		}

		const userData = await userInfo.find({ userId });
		const user = userData.find((obj) => obj.userId === userId);
		console.log(user);
		if (user) {
			user.firstname = firstname;
			user.lastname = lastname;
			user.email = email;
			user.contact = contact;
			user.pincode = pincode;
			user.city = city;
			user.website = website;
			user.linkedIn = linkedIn;
			user.gitHub = gitHub;
			user.languages = languages;
			user.role = role;
			user.careerObjective = careerObjective;
			const updatedUser = await user.save();
			console.log(updatedUser);
			res.status(200).json(updatedUser);
		}
	} catch (err) {
		console.log(err);
	}
});

userDetails.get('/userperonal/:id', async (req, res) => {
	try {
		const userid = req.params.id;
		console.log(userid);
		if (!userid) {
			res.status(400).send('Bad Request - userid is mandatory');
		}
		const userDetails = await userInfo.find({ userId: userid });

		const filtered = userDetails.find((obj) => obj.userId === userid);
		console.log(filtered);
		res.status(200).json(filtered);
	} catch (err) {
		console.log(err);
	}
});
userDetails.post('/usereduinfo', async (req, res) => {
	try {
		const { eduInfo, userId } = req.body;
		console.log(req.body);
		if (!(eduInfo && userId)) {
			res.status(400).send('Bad Request - all fields are mandatory');
		}
		const createdEduInfo = await educationDetails.create({
			userId: userId,
			educationInfo: eduInfo,
		});
		res.status(201).json(createdEduInfo);
		console.log(createdEduInfo);
	} catch (err) {
		console.log(err);
	}
});
userDetails.get('/eduInfo/:id', async (req, res) => {
	try {
		const userid = req.params.id;
		console.log(userid);
		if (!userid) {
			res.status(400).send('Bad Request - userid is mandatory');
		}
		const userDetails = await educationDetails.find({ userId: userid });
		if (userDetails === null) {
			res.status(404).send('No Data Found');
		}

		console.log(userDetails);
		const filtered = userDetails.find((obj) => obj.userId === userid);
		console.log(filtered);
		res.status(200).json(filtered);
	} catch (err) {
		console.log(err);
	}
});
userDetails.post('/userworkinfo', async (req, res) => {
	try {
		console.log(req.body);
		const { userId, workInfo } = req.body;

		if (!(userId && workInfo)) {
			res.status(400).send(' bad request - missing some mandatory fields');
		}
		const created = await workhistoryinfo.create({
			userId,
			workHistoryInfo: workInfo,
		});
		console.log(created);
		res.status(201).json(created);
	} catch (err) {
		console.log(err);
	}
});

userDetails.get('/workInfo/:id', async (req, res) => {
	try {
		const userid = req.params.id;
		console.log(userid);
		if (!userid) {
			res.status(400).send('Bad Request - userid is mandatory');
		}

		const userDetails = await workhistoryinfo.find({ userId: userid });
		if (userDetails === null) {
			res.status(404).send('No Data Found');
		}

		console.log(userDetails);
		const filtered = userDetails.find((obj) => obj.userId === userid);
		console.log(filtered);
		res.status(200).json(filtered);
	} catch (err) {
		console.log(err);
	}
});

userDetails.put('/workInfo/update/', async (req, res) => {
	try {
		const { userId, workInfo } = req.body;
		console.log('work', req.body);
		if (!userId) {
			res.status(400).send('Bad Request - UserID is mandatory');
		}
		if (!(userId && workInfo)) {
			res.status(400).send(' bad request - missing some mandatory fields');
		}

		const userWorkDetails = await workhistoryinfo.find({ userId: userId });
		const userWorkInfo = userWorkDetails.find((obj) => obj.userId === userId);

		console.log(userWorkInfo);
		if (userWorkInfo) {
			userWorkInfo.workHistoryInfo = workInfo;

			const updatedInfo = await userWorkInfo.save();
			console.log(updatedInfo);
			res.status(200).json(updatedInfo);
		}
	} catch (err) {
		console.log(err);
	}
});

userDetails.put('/eduInfo/update/', async (req, res) => {
	try {
		console.log('eduinfoupdaterequest', req.body);
		const { userId, educationInfo } = req.body;

		console.log('eduinfoupdate', userId, educationInfo);
		if (!(userId && educationInfo)) {
			res.status(400).send(' bad request - missing some mandatory fields');
		}

		const userEduDetails = await educationDetails.find({ userId: userId });

		const userEduInfo = userEduDetails.find((obj) => obj.userId === userId);
		console.log('Eduinfo update', userEduInfo);
		if (userEduInfo === null) {
			res.status(404).send('No Data Found');
		}

		if (userEduInfo) {
			userEduInfo.educationInfo = educationInfo;

			const updatedInfo = await userEduInfo.save();
			res.status(200).json(updatedInfo);
		}
	} catch (err) {
		console.log(err);
	}
});
userDetails.post('/usertechnicalinfo', async (req, res) => {
	try {
		console.log(req.body);
		const {
			userId,
			userCertifications,
			userExpTools,
			userExpSkills,
			userAchivements,
		} = req.body;
		if (
			(userCertifications &&
				userExpTools &&
				userExpSkills &&
				userAchivements) == null
		) {
			res.status(400).send(' bad request - missing some mandatory fields');
		}

		const technicalData = await technicalInfo.create({
			userId,
			userCertifications,
			userExpSkills,
			userExpTools,
			userAchivements,
		});

		res.status(201).json(technicalData);
	} catch (err) {
		console.log(err);
	}
});

userDetails.put('/technicalinfo/update/', async (req, res) => {
	try {
		const {
			userId,
			userCertifications,
			userExpTools,
			userExpSkills,
			userAchivements,
		} = req.body;

		if (
			(userId &&
				userCertifications &&
				userExpTools &&
				userExpSkills &&
				userAchivements) == null
		) {
			res.status(400).send(' bad request - missing some mandatory fields');
		}
		const technicalData = await technicalInfo.find({ userId });
		const userTechnicalInfo = technicalData.find(
			(obj) => obj.userId === userId
		);

		if (userTechnicalInfo) {
			userTechnicalInfo.userCertifications = userCertifications;
			userTechnicalInfo.userExpTools = userExpTools;
			userTechnicalInfo.userExpSkills = userExpSkills;
			userTechnicalInfo.userAchivements = userAchivements;

			const updatedInfo = await userTechnicalInfo.save();
			res.status(200).json(updatedInfo);
		}
	} catch (err) {
		console.log(err);
	}
});

userDetails.get('/technicalinfo/:id', async (req, res) => {
	try {
		const userid = req.params.id;
		console.log(userid);
		if (!userid) {
			res.status(400).send('Bad Request - userid is mandatory');
		}
		const userDetails = await technicalInfo.find({ userId: userid });

		const filtered = userDetails.find((obj) => obj.userId === userid);
		console.log(filtered);
		res.status(200).json(filtered);
	} catch (err) {
		console.log(err);
	}
});
userDetails.get('/dashboard', auth, (req, res) => {
	res.send('he is authorized');
});

module.exports = userDetails;
