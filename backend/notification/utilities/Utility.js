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
 * @param {string} text Text that you want to capitalize
 * @example toCapitalizedCase(text)
 * @returns {string} Capitalized Text
 */

const getStandardString = function (text) {
	return text.replace(/_|:|-/g, ' ').replace(/ +(?= )/g, '');
};


module.exports = {
	isEmailValid,
	getStandardString,
};
