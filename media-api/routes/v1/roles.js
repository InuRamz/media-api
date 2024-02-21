var express = require('express');
var router = express.Router();
var roleController = require('../../controllers/roles');

router.post('/', roleController.addRole);

module.exports = router;
