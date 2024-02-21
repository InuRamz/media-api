const Category = require('../schemas/category');

/**
 * @swagger
 * /api/v1/category:
 *   post:
 *     description: Create category
 *     tags: [Category]
 *     security:
 *       - ApiKeyAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       description: Category data
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Returns new category created.
 *       400:
 *         description: Bad requets.
 *       401:
 *         description: Unauthorized user.
 *       403:
 *         description: Required auth header or invalid Token.
 *       409:
 *         description: Duplicate keys.
 */
exports.addCategory = async (req, res, next) => {
	try {
		const {name, type, ext} = req.body;
		if(name?.length && type?.length){
			if(type === "File" || type === "Text" || type === "URL"){
				const newCategory = await new Category({
					name: name,
					type: type,
					ext: ext?.length ? ext : []
				}).save();
				res.status(201).send(newCategory);

			} else {
				res.status(400).send({status: 400, message: "Invalid category type", error: "BAD_REQUETS"});
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
 * /api/v1/category:
 *   get:
 *     description: Get all categories.
 *     tags: [Category]
 *     security:
 *       - ApiKeyAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       201:
 *         description: Returns new categories list.
 *       400:
 *         description: Bad requets.
 *       401:
 *         description: Unauthorized user.
 *       403:
 *         description: Required auth header or invalid Token.
 *       500:
 *         description: Server error.
 */
exports.getCategory = async (req, res, next) => {
	try {
		const categories = await Category.find({});
		res.send(categories);
	} catch (error) {
		next(error);
	}
}
