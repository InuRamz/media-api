const mongoose = require('mongoose');
const Thematic = require('../schemas/thematic');

/**
 * @swagger
 * /api/v1/thematic:
 *   post:
 *     description: Create new thematic.
 *     tags: [Thematic]
 *     security:
 *       - ApiKeyAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       description: Thematic data
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Thematic'
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
exports.addThematic = async (req, res, next) => {
	try {
		const {name, category} = req.body;
		const {file} = req;
		if(name?.length && category?.length && file){
			
			if(mongoose.Types.ObjectId.isValid(category)){
				const newThematic = await new Thematic({
					name: name, 
					front: file.filename, 
					_category: category
				}).save();
	
				res.status(201).send(newThematic);

			} else {
				res.status(400).send({status: 400, message: "Invalid permission reference", error: "BAD_REQUETS"});	
			}

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

/**
 * @swagger
 * /api/v1/thematic:
 *   get:
 *     description: Get all thematics.
 *     tags: [Thematic]
 *     security:
 *       - ApiKeyAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       201:
 *         description: Returns All thematic list.
 *       400:
 *         description: Bad requets.
 *       401:
 *         description: Unauthorized user.
 *       403:
 *         description: Required auth header or invalid Token.
 */
exports.getThematics = async (req, res, next) => {
	try {
		const thematics = await Thematic.find({});
		res.send(thematics);

	} catch (error) {
		next(error);
	}
}