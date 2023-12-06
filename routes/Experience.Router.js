const express = require('express');
const router = express.Router();
const UserController = require('../controllers/Experience.Controller.js'); // Update the path accordingly

// Routes for User CRUD operations
router.get('/experience/', UserController.getAll);
router.get('/experience/:id', UserController.getById);
router.post('/experience/', UserController.create);
router.put('/experience/:id', UserController.updateById);
router.delete('/experience/:id', UserController.deleteById);

module.exports = router;
