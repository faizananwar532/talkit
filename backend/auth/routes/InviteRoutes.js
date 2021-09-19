const router = require('express').Router();
const inviteController = require('./../controllers/InviteController');
const { authenticateToken } = require('../utilities/Middleware');


router.post('/', authenticateToken, async (req, res, next) => {

	req.response = await inviteController.inviteUser(req.body, req.user);
	next();

});

module.exports = router;