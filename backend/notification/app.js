const express = require('express');
const KeyMaster = require('./utilities/KeyMaster');
const { sendResponse } = require('./utilities/Middleware');
const { initChannelsSubscription } = require('./utilities/RedisStream');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res, next) => {

	req.response = { result: { status: KeyMaster.API_CODES.SUCCESS, data: { success: true } } };

	next();

}, sendResponse);

app.listen(process.env.PORT || 5000, () => {
	
	console.log('App started at port.', process.env.PORT || 5000);
	initChannelsSubscription([process.env.USER_CREATED_CHANNEL]);

});