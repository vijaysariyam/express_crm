const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Auth.Controller.js'); // Update the path accordingly

// Routes for User CRUD operations
router.get('/auth/', AuthController.getAll);
router.get('/auth/:id', AuthController.getById);
router.post('/auth/', AuthController.create);
router.put('/auth/:id', AuthController.updateById);
router.delete('/auth/:id', AuthController.deleteById);

module.exports = router;
