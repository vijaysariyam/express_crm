'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const { join } = require('path');
const connectToDatabase = require('./config/db');

const countryRouter = require('./routes/country.route.js');

const userRouter = require('./routes/User.Router.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
console.log('Project path :' + __dirname);
app.use('/', express.static(join(__dirname, 'public')));

const cors = require('cors');
const corsOptions = { credentials: true, origin: '*' };
app.use(cors(corsOptions));
app.use(cors());
// app.use(function (req, res, next) {
// 	var allowedDomains = [
// 		'http://localhost:3001',

// 	];
// 	var origin = req.headers.origin;

// 	if (allowedDomains.indexOf(origin) > -1) {
// 		res.setHeader('Access-Control-Allow-Origin', origin);
// 	}

// 	res.setHeader('Access-Control-Allow-Origin', '*');

// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// 	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
// 	res.setHeader('Access-Control-Allow-Credentials', true);
// 	next();
// });

app.use(express.json());

app.use('/v1', countryRouter);
app.use('/v1', userRouter);

app.get('/', async (req, res) => {
	try {
		await connectToDatabase();
		console.log('Connection successful. ');
		return res.status(200).json({ message: 'Server running' });
	} catch (error) {
		return res.status(500).send('Server error' + error);
	}
});

app.listen(8080, () => {
	console.log('Server is running on port 8080');
});
