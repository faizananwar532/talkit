const { isEmailValid, getHash, isHashValid, isPasswordValid, isUsernameValid } = require('./../utilities/Utility');
const exceptionHandler = require('../utilities/Exceptions');
const { generateAccessToken, generateRefreshToken, validateToken, generateActivationToken } = require('../utilities/Authentication');
const User = require('../models/User');
const KeyMaster = require('../utilities/KeyMaster');
const { publishOnRedisChannel } = require('../utilities/RedisStream');

/**
 * 
 * @param {string} {email} Email Address
 * @param {string} {password} Account password
 * @example register(email, password, firstName, lastName )
 */
const register = async function ({ username, email, password }, origin) {

	if (!username || !isUsernameValid(username)) {
		return { error: { status: KeyMaster.API_CODES.BAD_REQUEST, message: 'Username should not contain spaces or special character except "_"' } };
	}

	if (!email || !isEmailValid(email.toLowerCase())) {
		return { error: { status: KeyMaster.API_CODES.BAD_REQUEST, message: 'Invalid Email Address' } };
	}

	if (!password || !isPasswordValid(password)) {
		return { error: { status: KeyMaster.API_CODES.BAD_REQUEST, message: 'Invalid Password' } };
	}

	//Genegrates hash from plain text, using salt rounds from enviornment variable or default rounds 10
	const hashPassword = await getHash(password, process.env.ENCRYPTION_SALT_ROUNDS || 10);

	try {

		const user = await User.query().insert({ username, email: email.toLowerCase(), password: hashPassword, is_active: true });

		// Create activation link for the user
		const activationToken = generateActivationToken(user.email);
		const activationLink = `${origin}/activation/${activationToken}`;

		delete user['password'];

		publishOnRedisChannel(process.env.USER_CREATED_CHANNEL, { data: user, activation_link: activationLink });

		const { access_token, expiration_timestamp } = generateAccessToken(user);
		const refreshToken = generateRefreshToken(user);

		return {
			result: {
				status: KeyMaster.API_CODES.CREATED,
				data: {
					user_id: user.id,
					access_token: access_token,
					expiration_timestamp: expiration_timestamp,
					refresh_token: refreshToken,
				}
			}
		};

	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}

};

/**
 * 
 * @param {string} {email} Email Address
 * @param {string} {password} Account password
 * @example login(email, password)
 * @returns {object} containing status code and access token, refresh token and access token expiry timestamp
 */
const login = async function ({ email, password }) {

	try {

		const user = await User.query().findOne({ email: email.toLowerCase() }).throwIfNotFound({ message: 'Invalid email or password' });

		const isPasswordValid = await isHashValid(password, user.password);

		if (!isPasswordValid) {
			return { error: { status: KeyMaster.API_CODES.BAD_REQUEST, message: 'Invalid email or password' } };
		}

		// if (!user.is_active) {
		// 	return { error: { status: 401, message: 'This account is inactive. Please check your email we have sent you an activation link' } };
		// }

		const { access_token, expiration_timestamp } = generateAccessToken(user);
		const refreshToken = generateRefreshToken(user);

		return {
			result: {
				status: KeyMaster.API_CODES.SUCCESS,
				data: {
					user_id: user.id,
					access_token: access_token,
					refresh_token: refreshToken,
					expiration_timestamp: expiration_timestamp,
				}
			}
		};



	} catch (err) {

		return { error: exceptionHandler.getError(err) };

	}

};

/**
 * 
 * @param {string} refresh_token JWT Token
 * @example refreshToken (refreshToken)
 */
const refreshToken = async function ({ refresh_token }) {

	if (!refresh_token) {
		return { error: { status: KeyMaster.API_CODES.UNAUTHORIZED, message: 'Unauthorized' } };
	}

	try {

		const tokenData = validateToken(refresh_token, process.env.REFRESH_TOKEN_SECRET_KEY);

		const user = await User.query().findOne({ username: tokenData.user.username }).throwIfNotFound();

		delete user["password"];

		const { access_token, expiration_timestamp } = generateAccessToken(user);

		return {
			result: {
				status: KeyMaster.API_CODES.SUCCESS,
				data: {
					user_id: tokenData.user.id,
					access_token: access_token,
					expiration_timestamp: expiration_timestamp,
				}
			}
		};


	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}

};





module.exports = { register, login, refreshToken };