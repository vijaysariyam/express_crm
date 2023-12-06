const express = require('express');
const router = express.Router();
const UserController = require('../controllers/Education.Controller.js'); // Update the path accordingly

// Routes for User CRUD operations
router.get('/education/', UserController.getAll);
router.get('/education/:id', UserController.getById);
router.post('/education/', UserController.create);
router.put('/education/:id', UserController.updateById);
router.delete('/education/:id', UserController.deleteById);

module.exports = router;
