const jwt = require('jwt-simple');
const moment = require('moment');

exports.createToken = (userId) => {
	return jwt.encode({
		_id: userId,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix()
	}, "test");
}

exports.decodeToken = (token) => {
	try {
		let result = jwt.decode(token, "test");
		return result;

	} catch (error) {
		console.error(error);
		return null;
	}
}