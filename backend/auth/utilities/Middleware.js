const { validateToken } = require('./Authentication');

//Allow Cross-origin resource sharing
exports.crossOriginResource = async function (req, res, next) {

	// Website you wish to allow to connect
	if (req.headers.origin) {
		res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	}

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow	
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, sentry-trace, content-type, authorization, accept');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	if (req.method === 'OPTIONS') {
		res.sendStatus(200);
	} else {
		next();
	}

};

exports.authenticateToken = function (req, res, next) {

	const authorizationHeader = req.headers['authorization'];

	const accessToken = authorizationHeader && authorizationHeader.split(' ')[1];

	if (!accessToken) {
		return res.sendStatus(403);
	}

	try {
		const tokenData = validateToken(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
		req.user = tokenData.user;
		next();

	} catch (err) {
		res.sendStatus(401);
	}

};

/**
 * @param {Object} req
 * @param {Object} req.response
 * @param {Object} req.response.error
 * @param {Object} req.response.result
 */
exports.sendResponse = function (req, res) {

	const { result, error } = req.response;

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json({ data: result.data });
	} else {
		res.sendStatus(500);
	}

};