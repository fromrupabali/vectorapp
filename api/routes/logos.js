const express = require('express');

const router = express.Router();

const logoController = require('../controllers/logoControllers');

router.post('/', logoController.create_logo);
router.get('/:userId', logoController.get_logos);
router.get('/', logoController.get_all_logos);

module.exports = router;