const express = require('express');
const router = express.Router();
const UserController = require('../controllers/Address.Controller.js'); // Update the path accordingly

// Routes for User CRUD operations
router.get('/address/', UserController.getAll);
router.get('/address/:id', UserController.getById);
router.post('/address/', UserController.create);
router.put('/address/:id', UserController.updateById);
router.delete('/address/:id', UserController.deleteById);

router.post('/addresses', UserController.create);
router.get('/addresses', UserController.getAll);

module.exports = router;
