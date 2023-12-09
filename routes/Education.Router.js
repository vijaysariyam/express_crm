const express = require('express');
const router = express.Router();
const EducationController = require('../controllers/Education.Controller.js'); // Update the path accordingly

// Routes for User CRUD operations
router.get('/education/', EducationController.getAll);
router.get('/education/:id', EducationController.getById);
router.post('/education/', EducationController.create);
router.put('/education/:id', EducationController.updateById);
router.delete('/education/:id', EducationController.deleteById);

module.exports = router;
