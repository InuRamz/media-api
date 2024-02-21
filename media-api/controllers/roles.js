const mongoose = require('mongoose');
const userRole = require('../schemas/userRole');

/**
 * @swagger
 * /api/v1/role:
 *   post:
 *     description: Create new user role.
 *     tags: [UserRoles]
 *     security:
 *       - ApiKeyAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       description: Role data
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRole'
 *     responses:
 *       201:
 *         description: Returns new user role created.
 *       400:
 *         description: Bad requets.
 *       401:
 *         description: Unauthorized user.
 *       403:
 *         description: Required auth header or invalid Token.
 */
exports.addRole = async (req, res, next) => {
	try {
		const {name, permissions} = req.body;
		if(name?.length && permissions?.length) {
			
			if(permissions.every(perm => mongoose.Types.ObjectId.isValid(perm))){
				const newUserRole = await new userRole({
					name: name.toLowerCase(),
					_permissions: permissions
				}).save();
	
				res.status(201).send(newUserRole);

			} else {
				res.status(400).send({status: 400, message: "Invalid permission reference", error: "BAD_REQUETS"});	
			}

		} else {
			res.status(400).send({status: 400, message: "Insuficient body params", error: "BAD_REQUETS"});
		}

	} catch (error) {
		console.error(error);
		if(error.code && error.code === 11000){
			next({status: 409, error: error.message, message: "Duplicate keys"});

		} else {
			next({error: error.message});
		}
	}
}