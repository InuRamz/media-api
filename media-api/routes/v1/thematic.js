var express = require('express');
var router = express.Router();
const {permit} = require('../../middlewares/userPermissions');
const moment = require('moment');
const multer = require('multer');
const maxFileSize = 500 * 1024 * 1024; // 500 MB en bytes
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${moment().unix()}-${file.originalname}`),
});
const upload = multer({ storage: storage, limits: { fileSize: maxFileSize} });
var thematicController = require('../../controllers/thematic');

router.post('/', permit("thematic-thematic-create"), upload.single('front'), thematicController.addThematic);
router.get('/', permit("thematic-thematic-read"), thematicController.getThematics);

module.exports = router;
