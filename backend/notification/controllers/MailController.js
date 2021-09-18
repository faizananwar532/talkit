const KeyMaster = require('../utilities/KeyMaster');
const { isEmailValid } = require('../utilities/Utility');

const Mailgun = require('mailgun-js');
const { getError } = require('./../utilities/Exceptions');
// ({
// 	apiKey: process.env.MAILGUN_API_KEY,
// 	domain: process.env.MAILGUN_DOMAIN_NAME
// });

const mailgun = new Mailgun({
	apiKey: process.env.MAILGUN_API_KEY,
	domain: process.env.MAILGUN_DOMAIN_NAME
});

exports.sendMail = async ({ email, subject, html }) => {

	if (!isEmailValid) {
		return { error: { status: KeyMaster.API_CODES.BAD_REQUEST, message: 'Invalid Email Address' } };
	}

	const mailOption = {
		from: 'noreply@talkit.app',
		to: email,
		subject: subject,
		html: html
	};

	try {

		const mail = await mailgun.messages().send(mailOption);

		console.log(mail);
	
	} catch (err) {
		return { error: getError(err) };
	}

};