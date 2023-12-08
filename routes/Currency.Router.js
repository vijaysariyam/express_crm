const express = require('express');
const router = express.Router();
const UserController = require('../controllers/Currency.Controller.js'); // Update the path accordingly

// Routes for User CRUD operations
router.get('/currency/', UserController.getAll);
router.get('/currency/:id', UserController.getById);
router.post('/currency/', UserController.create);
router.put('/currency/:id', UserController.updateById);
router.delete('/currency/:id', UserController.deleteById);

router.post('/currencies', UserController.create);
router.get('/currencies', UserController.getAll);
module.exports = router;
