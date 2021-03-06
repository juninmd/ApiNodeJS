'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');
const authService = require('../services/authService');

router.get('/', authService.authorize, controller.get);
router.post('/', authService.authorize, controller.post);
router.get('/:id', authService.authorize, controller.getById);
router.get('/items/:id', controller.getItems)

module.exports = router;