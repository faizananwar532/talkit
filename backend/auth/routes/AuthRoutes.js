const router = require('express').Router();
const { authenticateToken } = require('../utilities/Middleware');
const authController = require('./../controllers/AuthController');

router.post('/verify', authenticateToken, async (req, res, next) => {

	next();

});

router.post('/signup', async (req, res, next) => {

	req.response = await authController.register(req.body);

	next();

});

router.post('/login', async (req, res, next) => {

	req.response = await authController.login(req.body);

	next();

});

router.post('/refresh', async (req, res, next) => {

	req.response = await authController.refreshToken(req.body);

	next();

});

module.exports = router;