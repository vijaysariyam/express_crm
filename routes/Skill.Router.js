const express = require('express');
const router = express.Router();
const UserController = require('../controllers/Skill.Controller.js'); // Update the path accordingly

// Routes for User CRUD operations
router.get('/skill/', UserController.getAll);
router.get('/skill/:id', UserController.getById);
router.post('/skill/', UserController.create);
router.put('/skill/:id', UserController.updateById);
router.delete('/skill/:id', UserController.deleteById);

module.exports = router;
