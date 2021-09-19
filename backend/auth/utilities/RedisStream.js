const redis = require('redis');

const pubcli = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_SERVER, { password: process.env.REDIS_PASSWORD });


exports.publishOnRedisChannel = (channel, data) => {

	pubcli.publish(channel, JSON.stringify(data));

};