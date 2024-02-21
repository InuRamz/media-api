var express = require('express');
var router = express.Router();
var fileController = require('../../controllers/file');

router.get('/:fileName', fileController.getFile);

module.exports = router;
