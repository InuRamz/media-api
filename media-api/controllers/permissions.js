const Permission = require('../schemas/userPermission');

/**
 * @swagger
 * /api/v1/permissions:
 *   post:
 *     description: Create user permission
 *     tags: [UserPermissions]
 *     security:
 *       - ApiKeyAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       description: Permission slug
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPermission'
 *     responses:
 *       201:
 *         description: Returns new user permission created.
 *       400:
 *         description: Bad requets.
 *       401:
 *         description: Unauthorized user.
 *       403:
 *         description: Required auth header or invalid Token.
 *       409:
 *         description: Duplicate keys.
 */
exports.addPermission = async (req, res, next) => {
	try {
		const {slug} = req.body;
		if(slug?.length){
			const newPermission = await new Permission({slug: slug.toLowerCase()}).save();
			res.status(201).send(newPermission);

		} else {
			res.status(400).send({status: 400, message: "Insuficient body params", error: "BAD_REQUETS"});
		}

	} catch (error) {
		if(error.code && error.code === 11000){
			next({status: 409, error: error.message, message: "Duplicate keys"});

		} else {
			next({error: error.message});
		}
	}
}