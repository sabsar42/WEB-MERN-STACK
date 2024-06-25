// src/app.js
const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();

// Security middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(cors());

// Parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// File upload middleware
const upload = multer({ dest: 'uploads/' });

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
const apiRoutes = require('./api/api');
app.use('/api', apiRoutes);

// Error handling middleware
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

module.exports = app;
