// src/app.js
const express = require('express');
// Initialize express app
const app = express();
const helmet = require('helmet');
const router = require('./src/routes/api');
const mongoSanitize = require('mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
// const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
})
// Security middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(cors());

// Parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// File upload middleware
const upload = multer({dest: 'uploads/'});

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
