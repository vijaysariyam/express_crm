const express = require('express');
const { authenticateToken } = require('../services/jwt.js');

const router = express.Router();
const UserController = require('../controllers/Candidate.Controller.js'); // Update the path accordingly

// Routes for User CRUD operations

router.get('/candidate/:id', UserController.getById);
router.post('/candidate/', UserController.create);
router.put('/candidate/:id', UserController.updateById);
router.delete('/candidate/:id', UserController.deleteById);

router.post('/candidates', authenticateToken, UserController.create);
router.post('/candidates/:id', authenticateToken, UserController.updateById);
router.get('/candidates/:id', authenticateToken, UserController.getById);
router.delete('/candidates/:id', UserController.deleteById);
router.get('/candidates', authenticateToken, UserController.getAll);
module.exports = router;
