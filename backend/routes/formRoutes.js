const express = require('express');
const { createForm, getForm, saveResponse } = require('../controllers/formController');
const router = express.Router();

router.post('/', createForm);               // Create a form
router.get('/:id', getForm);                // Get form by its ID
router.post('/response', saveResponse);     // Save user responses

module.exports = router;
