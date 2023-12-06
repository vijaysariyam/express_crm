const express = require('express');
const router = express.Router();
const UserController = require('../controllers/Candidate.Controller.js'); // Update the path accordingly

// Routes for User CRUD operations
router.get('/candidate/', UserController.getAll);
router.get('/candidate/:id', UserController.getById);
router.post('/candidate/', UserController.create);
router.put('/candidate/:id', UserController.updateById);
router.delete('/candidate/:id', UserController.deleteById);

module.exports = router;
