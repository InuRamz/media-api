const mongoose = require('mongoose');
const User = require('../schemas/user');

/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     description: Create new user.
 *     tags: [User]
 *     security:
 *       - ApiKeyAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       description: User data
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Returns new Thematic created.
 *       400:
 *         description: Bad requets.
 *       401:
 *         description: Unauthorized user.
 *       403:
 *         description: Required auth header or invalid Token.
 */
exports.addUser = async (req, res, next) => {
	try {
		const {userName, email, password, role} = req.body;
		
		if(userName?.length && email?.length && password?.length && role?.length){

			if(mongoose.Types.ObjectId.isValid(role)) {
				const newUser = await new User({
					userName: userName,
					email: email,
					password: password,
					_role: role
				}).save();
		
				res.status(201).send(newUser);

			} else {
				res.status(400).send({status: 400, message: "Invalid role reference", error: "BAD_REQUETS"});	
			}

		} else {
			res.status(400).send({status: 400, message: "Insuficient body params", error: "BAD_REQUETS"});
		}

	} catch (error) {
		next(error)
	}
}

/**
 * @swagger
 * /api/v1/user/permissions:
 *   get:
 *     description: Get user permissions.
 *     tags: [User]
 *     security:
 *       - ApiKeyAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       201:
 *         description: Returns user permissions list.
 *       400:
 *         description: Bad requets.
 *       401:
 *         description: Unauthorized user.
 *       403:
 *         description: Required auth header or invalid Token.
 */
exports.getUserPermissions = async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id).populate({path: "_role", populate: {path: "_permissions"}});
		if(user?._role?._permissions?.length){
			const permissions = user._role._permissions.map(p => p.slug);
			res.send(permissions);
		}

	} catch (error) {
		next(error)
	}
}