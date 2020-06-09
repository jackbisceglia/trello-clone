// Library Imports
const express = require('express');

// Database Imports
const db = require('./db');

// Models

// Express App
const app = express();

app.get('/', (req, res) => res.send("Home Page is running"));


// Card Routes
app.use('/cards', require('./routes/cardsRoute'))

// Task Routes
app.use('/tasks', require('./routes/tasksRoute'))

const PORT = process.env.PORT || 5000;

app.listen(PORT);