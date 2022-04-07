const express = require('express');
const mongoose = require('mongoose');
const resumeDetails = require('./Routers/apiRoutes');
const userDetails = require('./Routers/userRoutes');
require('dotenv').config();
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
const PORT = process.env.PORT || 4000;
app.listen(PORT, (res) => {
	console.log(`server is started${PORT}`);
});
//skills API
app.use('/api/v1/user', userDetails);
app.use('/api/v1/', resumeDetails);
app.get('/skills', (req, res) => {
	res.send(skillsData);
});
app.get('/', (req, res) => {
	res.send('Hiii Rk SErvices');
});
