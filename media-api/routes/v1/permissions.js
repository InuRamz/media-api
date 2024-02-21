var express = require('express');
var router = express.Router();
const {permit} = require('../../middlewares/userPermissions');
var permissionController = require('../../controllers/permissions');

router.post('/', permit("user-permission-create"), permissionController.addPermission);

module.exports = router;
