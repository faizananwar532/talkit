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

app.listen(process.env.PORT || 5000, async () => {

	console.log('App started at port.', process.env.PORT || 5000);
	initChannelsSubscription([process.env.USER_CREATED_CHANNEL]);

	// const res = await fetch('http://auth:4000/auth/verify/', {
	// 	method: 'POST',
	// 	headers: {
	// 		'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzE5NzcwNTksInVzZXIiOnsidXNlcl9pZCI6MjIsInVzZXJuYW1lIjoiYXdhaXNfc2hhZmlxIiwiZW1haWwiOiJhd2Fpc3NoYWZpcTUwM0BnbWFpbC5jb20ifSwiaWF0IjoxNjMxOTczNDU5fQ.kn2YC7W5HnMqmjB4PTs0SI8z5FzWCF7ozBtpARuyecg'
	// 	},
	// });	

	// const json = await res.json();

	// console.log(json);

});