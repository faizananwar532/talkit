const redis = require('redis');
const client = redis.createClient(6379, 'redischatapp');

const createNotification = async () => {

	client.hmset('notification:john123', 'message', 'Someone sent you a message', 'from', 'ali123',);

};

const listUserNotification = async () => {

	const re = await new Promise((resolve, reject) => {
		client.hgetall('notification:john123', (err, value) => {
			if (value) {
				resolve({ data: value });
			} else {
				reject({ error: err });
			}
		});
	});

	console.log(re);

};


module.exports = { createNotification, listUserNotification };