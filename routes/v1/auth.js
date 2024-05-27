var express = require('express');
var router = express.Router();

var authController = require('../../src/controllers/auth.controller');
var authValidator = require('../../src/validators/auth.validator');

router.post('/register', authValidator.register, authController.register);
router.post('/login', authValidator.login, authController.login);

module.exports = router;