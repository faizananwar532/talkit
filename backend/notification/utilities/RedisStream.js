const redis = require('redis');
const { sendMail } = require('../controllers/MailController');

const pubcli = redis.createClient(6379, 'redischatapp');

const subcli = redis.createClient(6379, 'redischatapp');

exports.initChannelsSubscription = (channels) => {
	subcli.on('subscribe', function (channel, count) {
		console.log('subscribe!', channel, count);
	});

	subcli.on('message', function (channel, message) {

		try {
		
			const { data, activation_link } = JSON.parse(message);
			sendMail({ 
				email: data.email, 
				subject: channel.replace('_', ' '), 
				html: `
				<b>Thank you for signing up on <font color="#D92B21">talkit</font>.</b>
				<br />
				<p>Click the link below to activate your acount</p> 
				<a href="${activation_link}">Click here to activate your account.</a>`
			});
		
		} catch (err) {
			console.log(err.message);
		}


	});

	subcli.on('error', function (error) {
		console.log(error, 'Error');
	});

	subcli.subscribe(channels);
};


exports.publicOnRedisChannel = (channel, data) => {

	pubcli.publish(channel, JSON.stringify(data));

};