const router = require('express').Router();

router.post('/', async (req, res, next) => {

	req.response = { result: { status: 200, data: {} } };
	next();

});

module.exports = router;