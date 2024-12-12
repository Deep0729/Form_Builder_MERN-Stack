require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/forms', formRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
    .catch((error) => console.log(error.message));
