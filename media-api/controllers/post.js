const mongoose = require('mongoose');
const Post = require('../schemas/post');
const Thematic = require('../schemas/thematic');

/**
 * @swagger
 * /api/v1/post:
 *   get:
 *     description: Get all post
 *     tags: [Post]
 *     security:
 *       - ApiKeyAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       201:
 *         description: Returns all post list.
 *       400:
 *         description: Bad requets.
 *       401:
 *         description: Unauthorized user.
 *       403:
 *         description: Required auth header or invalid Token.
 */
exports.getPost = async (req, res, next) => {
	try {
		const post = await Post.find({}).populate({path: "_thematic", populate: {path: "_category"}});
		res.send(post);
	} catch (error) {
		next(error);
	}
}

/**
 * @swagger
 * /api/v1/post:
 *   post:
 *     description: Create new post
 *     tags: [Post]
 *     security:
 *       - ApiKeyAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       description: Post data
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/PostFile'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostText'
 *     responses:
 *       201:
 *         description: Returns new post created.
 *       400:
 *         description: Bad requets.
 *       401:
 *         description: Unauthorized user.
 *       403:
 *         description: Required auth header or invalid Token.
 */
exports.addPost = async (req, res, next) => {
	try {
		let {title, thematicId, file} = req.body;
		file = (file?.length) ? file : req.file;

		if(title?.length && thematicId?.length){
			if(mongoose.Types.ObjectId.isValid(thematicId)){
				const thematic = await Thematic.findById(thematicId).populate({path: "_category"});
				
				if(thematic._category.type === "URL" || thematic._category.type === "Text"){
					const postText = await new Post({
						title: title,
						content: file,
						_thematic: thematicId,
						_owner: req.user._id
					}).save();

					const postTextPopulated = await Post.findById(postText._id).populate({path: "_thematic", populate: {path: "_category"}});
					res.status(201).send(postTextPopulated);

				} else {
					const postFile = await new Post({
						title: title,
						content: file.filename,
						_thematic: thematicId,
						_owner: req.user._id
					}).save();

					const postFilePopulated = await Post.findById(postFile._id).populate({path: "_thematic", populate: {path: "_category"}});
					res.status(201).send(postFilePopulated);
				}

			} else {
				res.status(400).send({status: 400, message: "Invalid thematic reference", error: "BAD_REQUETS"});		
			}

		} else {
			res.status(400).send({status: 400, message: "Insuficient body params", error: "BAD_REQUETS"});
		}
	} catch (error) {
		next(error);
	}
}

/**
 * @swagger
 * /api/v1/post/{postId}:
 *   patch:
 *     description: Edit a post
 *     tags: [Post]
 *     security:
 *       - ApiKeyAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Post ID to edit
 *     requestBody:
 *       required: true
 *       description: Post data
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/PostFile'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostText'
 *     responses:
 *       201:
 *         description: Returns post edited.
 *       400:
 *         description: Bad requets.
 *       401:
 *         description: Unauthorized user.
 *       403:
 *         description: Required auth header or invalid Token.
 */
exports.setPost = async (req, res, next) => {
	try {
		const {postId} = req.params;
		let {title, thematicId, file} = req.body;
		file = (file?.length) ? file : req.file;

		if(mongoose.Types.ObjectId.isValid(postId)){
			if(title?.length && thematicId?.length && mongoose.Types.ObjectId.isValid(thematicId)) {
				const post = await Post.findById(postId).populate({path: "_thematic", populate: {path: "_category"}});
				if(post?._id){
					if(post._thematic._category.type === "URL" || post._thematic._category.type === "Text"){
						const postTextUpdated = await Post.findOneAndUpdate({_id: post._id}, {$set: {
							title: title,
							content: req.file.filename,
							_thematic: thematicId,
							_owner: req.user._id
						}}, {new: true});
						res.send(postTextUpdated);

					} else {
						const postFileUpdated = await Post.findOneAndUpdate({_id: post._id}, {$set: {
							title: title,
							content: req.file.filename,
							_thematic: thematicId,
							_owner: req.user._id
						}}, {new: true});
						res.send(postFileUpdated);
					}
	
				} else {
					res.status(404).send({status: 404, message: "Post not found", error: "NOT_FOUND"});
				}
	
			} else {
				res.status(400).send({status: 400, message: "Insuficient body params", error: "BAD_REQUETS"});
			}

		} else {
			res.status(400).send({status: 400, message: "Invalid post reference", error: "BAD_REQUETS"});
		}
	} catch (error) {
		next(error);
	}
}

/**
 * @swagger
 * /api/v1/post/{postId}:
 *   delete:
 *     description: Delete a post
 *     tags: [Post]
 *     security:
 *       - ApiKeyAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Post ID to edit
 *     responses:
 *       201:
 *         description: Returns post deleted.
 *       400:
 *         description: Bad requets.
 *       401:
 *         description: Unauthorized user.
 *       403:
 *         description: Required auth header or invalid Token.
 */
exports.deletePost = async (req, res, next) => {
	try {
		const {postId} = req.params;
		if(mongoose.Types.ObjectId.isValid(postId)){
			const post = await Post.findOneAndDelete({_id: postId}, {new: true});
			if(post){
				res.status(200).send(post);

			} else {
				res.status(404).send({status: 404, message: "Post not found", error: "NOT_FOUND"});	
			}

		} else {
			res.status(400).send({status: 400, message: "Invalid post reference", error: "BAD_REQUETS"});
		}
	} catch (error) {
		next(error);
	}
}