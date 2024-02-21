const User = require('../schemas/user');
const {decodeToken} = require('../services/jwt');

exports.validate = async (req, res, next) => {
	try {
		if(req.method === 'OPTIONS'){
			next();

		} else {
			if(!req.headers.authorization){
				res.status(403).send({message:'Auth header is required.'});
	
			} else {
				const payload = decodeToken(req.headers.authorization);
				if(payload?._id){
					const user = await User.findById(payload._id).populate({path: "_role", populate: {path: "_permissions"}});
					req.user = user;
					next();
	
				} else {
					res.status(403).send({message:'Invalid Token.'});
				}
	
			}
		}
	} catch (error) {
		next(error);
	}
}