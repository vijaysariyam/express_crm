const express = require('express');
const router = express.Router();
const UserController = require('../controllers/PhoneNumber.Controller.js'); // Update the path accordingly

// Routes for User CRUD operations
router.get('/phoneNumber/', UserController.getAll);
router.get('/phoneNumber/:id', UserController.getById);
router.post('/phoneNumber/', UserController.create);
router.put('/phoneNumber/:id', UserController.updateById);
router.delete('/phoneNumber/:id', UserController.deleteById);

module.exports = router;
