var express = require('express');
var router = express.Router();
var authMiddleware = require('../../src/middlewares/auth.middleware');
var taskController = require('../../src/controllers/task.controller')

router.post('/', authMiddleware, taskController.create);
router.get('/', authMiddleware, taskController.findAll);
router.get('/:id', authMiddleware, taskController.findOne);
router.put('/:id', authMiddleware, taskController.update);
router.delete('/:id', authMiddleware, taskController.delete);

module.exports = router;