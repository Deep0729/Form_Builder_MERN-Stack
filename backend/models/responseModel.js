const mongoose = require('mongoose');

const responseSchema = mongoose.Schema({
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
    responses: { type: Array, required: true }
});

module.exports = mongoose.model('Response', responseSchema);
