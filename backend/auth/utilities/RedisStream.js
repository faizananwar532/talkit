const redis = require('redis');

const pubcli = redis.createClient(6379, 'redischatapp');

exports.publishOnRedisChannel = (channel, data) => {

	pubcli.publish(channel, JSON.stringify(data));

};