var express = require('express');
var router = express.Router();
var userController = require('../../controllers/user');

router.post('/', userController.addUser);
router.get('/permissions', userController.getUserPermissions);

module.exports = router;
