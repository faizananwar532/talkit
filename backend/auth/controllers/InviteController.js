const User = require('../models/User');
const { getError } = require('../utilities/Exceptions');
const KeyMaster = require('../utilities/KeyMaster');
const { publishOnRedisChannel } = require('../utilities/RedisStream');
const { isEmailValid } = require('../utilities/Utility');

const inviteUser = async function ({ email }, { username }) {

	if (!email || !isEmailValid(email)) {
		return { error: { status: KeyMaster.API_CODES.BAD_REQUEST, message: 'Invalid email format' } };
	}

	try {

		const user = await User.query().findOne({ email: email });

		if (!user) {
			publishOnRedisChannel(process.env.USER_INVITATION_CHANNEL, { email, invited_by: username });
		}
		return { result: { status: KeyMaster.API_CODES.SUCCESS, data: { user, message: !user && 'Invitation has been sent' } } };

	} catch (err) {
		return { error: getError(err) };
	}



};

module.exports = { inviteUser };