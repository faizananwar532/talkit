const express = require('express');
const KeyMaster = require('./utilities/KeyMaster');
const { sendResponse } = require('./utilities/Middleware');
const databaseConfig = require('./database/DatabaseConfig');
const authRoutes = require('./routes/AuthRoutes');
const inviteRoutes = require('./routes/InviteRoutes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

databaseConfig.initializeDB();

app.get('/', async (req, res, next) => {

	req.response = { result: { status: KeyMaster.API_CODES.SUCCESS, data: { success: true } } };

	next();

}, sendResponse);

app.use('/auth', authRoutes, sendResponse);
app.use('/invite_users', inviteRoutes, sendResponse);

app.listen(process.env.PORT || 4000, () => {
	console.log('App started at port.', process.env.PORT || 4000);
});