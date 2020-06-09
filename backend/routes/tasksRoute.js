const express = require('express');
const router = express.Router();
const db = require('../db');
const Card = require('../models/Card');
const Task = require('../models/Task');

db.sync({force : true});

router.get('/', (req, res) => 
Card.findAll({
})
.then(cards => {
    res.json(cards);
})
.catch(err => console.log(err)))


module.exports = router;