const express = require('express');
const mongoose = require('mongoose');
const resumeDetails = require('./Routers/apiRoutes');

const app = express();
app.use(express.json());
mongoose
	.connect(process.env.MONGODB_URL || 'mongodb://localhost/resumeBuilder', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(console.log('DB Connected Successfully'))
	.catch((err) => {
		console.log('DB Connection Failed', err);
		process.exit(1);
	});

app.listen(1919, (res) => {
	console.log('server is started');
});
//skills API

app.use('/api/v1/', resumeDetails);
app.get('/skills', (req, res) => {
	res.send(skillsData);
});
