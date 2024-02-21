var express = require('express');
var router = express.Router();
const {permit} = require('../../middlewares/userPermissions');
var categoryController = require('../../controllers/category');

router.post('/', permit("category-category-create"), categoryController.addCategory);
router.get('/', permit("category-category-read"), categoryController.getCategory);

module.exports = router;
