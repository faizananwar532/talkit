const router = require('express').Router();

router.post('/', async (req, res, next) => {

	next();

});

module.exports = router;