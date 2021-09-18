const bcrypt = require('bcrypt');
/**
 * 
 * @param {string} email Email to be validated 
 * @returns {boolean} true if email is valid else false
 */
const isEmailValid = function (email) {

	const validationRegex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);

	return validationRegex.test(email);

};

/**
 * 
 * @param {string} password Password to be validated
 */
const isPasswordValid = function (password) {
	const validationRegex = /(^(?=.*[~|`|!|@|#|$|%|^|&|*|(|)|_|=|+|-])[0-9a-zA-Z~`!@#$%^&*()_=+-]{10,})/g;
	return validationRegex.test(password);
};

/**
 * 
 * @param {string} text plain text that has to be encrypted
 * @param {number} saltRounds number of rounds for salt
 * @returns {string} encrypted hash
 */
const getHash = async function (text, saltRounds) {

	return await bcrypt.hash(text, saltRounds);

};

/**
 * 
 * @param {string} plain plain text that needs to be validated
 * @param {string} hash encrypted hash that will validate plain text
 * @returns {boolean} true if hash compare is success else false
 */
const isHashValid = async function (plain, hash) {

	return await bcrypt.compare(plain, hash);

};

/**
 * 
 * @param {string} text Text that you want to capitalize
 * @example toCapitalizedCase(text)
 * @returns {string} Capitalized Text
 */

const getStandardString = function (text) {
	return text.replace(/_|:|-/g, ' ').replace(/ +(?= )/g, '');
};


module.exports = {
	isEmailValid,
	getHash,
	isHashValid,
	getStandardString,
	isPasswordValid,
};
