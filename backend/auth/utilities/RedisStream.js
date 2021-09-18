const redis = require('redis');

const pubcli = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_SERVER);

exports.publishOnRedisChannel = (channel, data) => {

	pubcli.publish(channel, JSON.stringify(data));

};