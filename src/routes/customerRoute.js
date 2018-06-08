'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customerController');

router.get('/', controller.get);
router.post('/', controller.post);
router.post('/authenticate', controller.authenticate);
router.delete('/:id', controller.del);

module.exports = router;