const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    type: { type: String, required: true }, // The types are: Categorize, Cloze, Comprehension
    data: { type: Object, required: true }
});

const formSchema = mongoose.Schema({
    title: { type: String, required: true },
    headerImage: { type: String },
    questions: [questionSchema],
});

module.exports = mongoose.model('Form', formSchema);
