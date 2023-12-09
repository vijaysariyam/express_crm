const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/Address.Controller.js'); // Update the path accordingly

// Routes for User CRUD operations
router.get('/address/', AddressController.getAll);
router.get('/address/:id', AddressController.getById);
router.post('/address/', AddressController.create);
router.put('/address/:id', AddressController.updateById);
router.delete('/address/:id', AddressController.deleteById);

router.post('/addresses', AddressController.create);
router.get('/addresses', AddressController.getAll);

module.exports = router;
