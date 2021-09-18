const redis = require('redis');

const pubcli = redis.createClient(6379, 'redischatapp');

// const subcli = redis.createClient(6379, 'redischatapp');

// subcli.on('subscribe', function (channel, count) {
// 	console.log('subscribe!', channel, count);
// });

// subcli.on('message', function (channel, message) {
// 	console.log('Message: ', message);
// });

// subcli.on('error', function (error) {

// 	console.log(error, 'Error');

// });

// subcli.subscribe(process.env.USER_CREATED_CHANNEL);

exports.publicOnRedisChannel = (channel, data) => {

	pubcli.publish(channel, JSON.stringify(data));

};