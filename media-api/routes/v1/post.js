var express = require('express');
var router = express.Router();
const moment = require('moment');
const multer = require('multer');
const maxFileSize = 500 * 1024 * 1024; // 500 MB en bytes
var postController = require('../../controllers/post');
const {permit} = require('../../middlewares/userPermissions');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${moment().unix()}-${file.originalname}`),
});
const upload = multer({ storage: storage, limits: { fileSize: maxFileSize} });

router.get('/', permit("post-post-read"), postController.getPost);
router.post('/', permit("post-post-create"), upload.single('file'), postController.addPost);
router.patch('/:postId', permit("post-post-update"), upload.single('file'), postController.setPost);
router.delete('/:postId', permit("post-post-delete"), postController.deletePost);

module.exports = router;
