const express = require('express');
const router = express.Router();
const ExperienceController = require('../controllers/Experience.Controller.js'); // Update the path accordingly

// Routes for User CRUD operations
router.get('/experience/', ExperienceController.getAll);
router.get('/experience/:id', ExperienceController.getById);
router.post('/experience/', ExperienceController.create);
router.put('/experience/:id', ExperienceController.updateById);
router.delete('/experience/:id', ExperienceController.deleteById);

module.exports = router;
