const express = require('express');
const router = express.Router();
const CurrencyController = require('../controllers/Currency.Controller.js'); // Update the path accordingly

// Routes for User CRUD operations
router.get('/currency/', CurrencyController.getAll);
router.get('/currency/:id', CurrencyController.getById);
router.post('/currency/', CurrencyController.create);
router.put('/currency/:id', CurrencyController.updateById);
router.delete('/currency/:id', CurrencyController.deleteById);

router.post('/currencies', CurrencyController.create);
router.get('/currencies', CurrencyController.getAll);
module.exports = router;
