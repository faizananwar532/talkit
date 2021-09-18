const jwt = require('jsonwebtoken');

/**
 * 
 * @summary This function generates JSON Web Token
 * @param {object} user for which the token will be generated
 * @param {number} expirationTimestamp token expiration timestamp
 * @param {string} key key that will be used to encrypt the object
 * @example getToken (user);
 * @returns {string} token string
 */
const getToken = function (user, expirationTimestamp, key) {

	return jwt.sign({ exp: expirationTimestamp, user: user }, key);

};

/**
 * 
 * @summary This function validate token
 * @param {string} token token string to be verified
 * @param {string} key secrete against which token will be verified
 * @example validateToken(token, key)
 * @returns {object} error if token is not valid else user
 */
const validateToken = function (token, key) {
	return jwt.verify(token, key);
};

/**
 * 
 * @summary This function generates access token
 * @param {object} user User object for which the token will be generated
 * @example generateAccessToken (user)
 */
const generateAccessToken = function (user) {
	const accessTokenExpirationTime = Math.floor(Date.now() / 1000) + (60 * 60); //3600 = 1 hours
	const accessTokenScerete = process.env.ACCESS_TOKEN_SECRET_KEY || 'secretaccess';

	const token = getToken({ user_id: user.id, username: user.username, email: user.email }, accessTokenExpirationTime, accessTokenScerete);

	return { access_token: token, expiration_timestamp: accessTokenExpirationTime };
};

/**
 * 
 * @summary This function generates refresh token
 * @param {object} user User object for which the token will be generated
 * @example generateRefreshToken(user)
 */
const generateRefreshToken = function (user) {
	const refreshTokenExpirationTime = Math.floor(Date.now() / 1000) + (3600 * (24 * 7)); //3600 * (24 * 7) = 7 days
	const refreshTokenSecrete = process.env.REFRESH_TOKEN_SECRET_KEY || 'secretrefresh';

	return getToken({ user_id: user.id, username: user.username, email: user.email }, refreshTokenExpirationTime, refreshTokenSecrete);

};


/**
 * 
 * @summary This function generates reset password token
 * @param {string} email for which to reset password link will be generated
 * @returns
 */
const generateResetPasswordToken = function (email) {

	const expiryTime = Math.floor(Date.now() / 1000 + (3600 * 5));
	const resetPasswordSecrete = process.env.RESET_PASSWORD_TOKEN_SECRET_KEY;

	return getToken({ email: email }, expiryTime, resetPasswordSecrete);

};

/**
 * @summary This function will generate activation token for the user
 * @param {string} email user email
 * @example generateActivationToken(test@example.com)
 * @returns 
 */
const generateActivationToken = function (email) {

	const expiryTime = Math.floor(Date.now() / 1000 + (3600 * 5));
	const userActivationTokenSecrete = process.env.USER_ACTIVATION_TOKEN_SECRET_KEY;

	return getToken({email: email}, expiryTime, userActivationTokenSecrete);

};

module.exports = { validateToken, generateAccessToken, generateRefreshToken, generateResetPasswordToken, generateActivationToken };