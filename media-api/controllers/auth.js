const User = require('../schemas/user');
const {createToken} = require('../services/jwt');

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     description: Do login with user & password
 *     tags: [Login]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       description: User´s credentials
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *       401:
 *         description: Unauthorized user.
 */
exports.doLogin = async (req, res, next) => {
	try {
		const {userName, password} = req.body;
		if(userName?.length && password?.length){
			const user = await User.findOne({userName: userName, password: password});
			
			if(user?._id){
				const userToken = createToken(user._id);
				res.send({user: user, token: userToken});
			
			} else{ 
				res.status(401).send({status: 401, message: "Incorrect user or password error", error: "UNAUTHORIZED"});
			}

		} else {
			res.status(401).send({status: 401, message: "Incorrect user or password error", error: "UNAUTHORIZED"});
		}
	} catch (error) {
		next(error);
	}
}