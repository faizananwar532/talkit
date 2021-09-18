class KeyMaster {

	/**
	 * API RESPONSE CODES
	 */
	static get API_CODES() {
		return {
			/**
			 * The request was successfully completed.
			 */
			SUCCESS: 200,
			/**
			 * A new resource was successfully created.
			 */

			CREATED: 201,
			/**
			 * The server successfully processed the request, but is not returning any content.
			 */
			NO_CONTENT: 204,
			/**
			 * Used for conditional GET calls to reduce band-width usage. 
			 * If used, must set the Date, Content-Location, ETag headers to what they would have been on a regular GET call.
			 */
			NOT_MODIFIED: 304,
			/**
			 * The request was invalid.
			 */
			BAD_REQUEST: 400,
			/**
			 * The request did not include an authentication token or the authentication token was expired.
			 */
			UNAUTHORIZED: 401,
			/**
			 * The client did not have permission to access the requested resource.
			 */
			FORBIDDEN: 403,
			/**
			 * The requested resource was not found.
			 */
			NOT_FOUND: 404,
			/**
			 * The HTTP method in the request was not supported by the resource. For example, the DELETE method cannot be used with the Agent API.
			 */
			METHOD_NOT_ALLOWED: 405,
			/**
			 * The request could not be completed due to a conflict. For example,
			 * POST ContentStore Folder API cannot complete if the given file or folder name already exists in the parent location.
			 */
			CONFLICT: 409,
			/*
			*The request was not completed due to an internal error on the server side. 
			*/
			INTERNAL_SERVER_ERROR: 500,
			/**
			 * The server was unavailable.
			 */
			SERVICE_UNAVAILABLE: 503,
		};
	}

}

module.exports = KeyMaster;