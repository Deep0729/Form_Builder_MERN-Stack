const Form = require('../models/formModel');
const Response = require('../models/responseModel');

exports.createForm = async (req, res) => {
    try {
        const form = await Form.create(req.body);
        res.status(201).json(form);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getForm = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        res.status(200).json(form);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.saveResponse = async (req, res) => {
    try {
        const response = await Response.create(req.body);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
