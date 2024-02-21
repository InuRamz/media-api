const path = require('path');
const fs = require('fs');

/**
 * @swagger
 * /api/v1/file/{fileName}:
 *   get:
 *     description: Get a file.
 *     tags: [File]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: fileName
 *         schema:
 *           type: string
 *         required: true
 *         description: File name
 *     responses:
 *       200:
 *         description: Returns file.
 *       401:
 *         description: Unauthorized user.
 *       404:
 *         description: File not found.
 *       500:
 *         description: Server error.
 */
exports.getFile = async (req, res, next) => {
	try {
		const {fileName} = req.params;
		const filePath = path.join(__dirname, '..', 'uploads', fileName);
		
		if(fs.existsSync(filePath)){
			const file = await fs.promises.readFile(filePath);
			res.setHeader('Content-type', 'image/*');
			res.send(file);

		} else {
			res.status(404).send({status: 404, message: "File not found", error: "NOT_FOUND"});
		}

	} catch (error) {
		next(error);
	}
}