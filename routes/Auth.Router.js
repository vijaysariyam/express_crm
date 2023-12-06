const express = require('express');
const router = express.Router();
const UserController = require('../controllers/Auth.Controller.js'); // Update the path accordingly

// Routes for User CRUD operations
router.get('/auth/', UserController.getAll);
router.get('/auth/:id', UserController.getById);
router.post('/auth/', UserController.create);
router.put('/auth/:id', UserController.updateById);
router.delete('/auth/:id', UserController.deleteById);

module.exports = router;
