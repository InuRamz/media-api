var express = require('express');
var router = express.Router();
var authController = require('../../controllers/auth');

router.post('/', authController.doLogin);

module.exports = router;
