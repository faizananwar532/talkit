const {
	ValidationError,
	NotFoundError,
	// DBError,
	// ConstraintViolationError,
	UniqueViolationError,
	NotNullViolationError,
	// ForeignKeyViolationError,
	// CheckViolationError,
	// DataError
} = require('objection');
const KeyMaster = require('./KeyMaster');
// const { getStandardString } = require('./Utility');

/**
 * @summary Handles Objection exceptions
 * @param {object} err Objection js error object
 * @example getError(err : ValidationError)
 * @returns JavaScript object which includes message, error type, data
 */
const getError = function (err) {


	if (err instanceof UniqueViolationError) {
		return {
			status: KeyMaster.API_CODES.CONFLICT,
			message: err.columns.length > 0 ? `${err.columns[0].replace(/_|:|-/g, ' ').replace(/ +(?= )/g, '')} already exists` : 'Unknown Error',
			// message: err.columns.length > 0 ? getStandardString(`${err.columns[0]} already exists`) : 'Unknown Error',
		};
	}

	if (err instanceof NotFoundError) {
		return {
			status: KeyMaster.API_CODES.NOT_FOUND,
			message: err.message,
		};
	}

	if (err instanceof NotNullViolationError) {
		return {
			status: KeyMaster.API_CODES.BAD_REQUEST,
			message: err.columns.length > 0 ? `${err.columns[0].replace(/_|:|-/g, ' ').replace(/ +(?= )/g, '')} cannot be null` : 'Unknown Error',
		};
	}

	if (err instanceof ValidationError) {
		return {
			status: KeyMaster.API_CODES.BAD_REQUEST,
			message: err.message.replace(/_|:|-/g, ' ').replace(/ +(?= )/g, '')
		};
	}


	return {
		status: KeyMaster.API_CODES.NOT_FOUND,
		message: err.message
	};

};

module.exports = { getError };