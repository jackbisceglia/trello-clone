const express = require('express');
const router = express.Router();
const db = require('../db');
const Card = require('../models/Card');
const Task = require('../models/Task');

db.sync({force : true});
const card1 = Card.create({ cardTitle: "Card 1" });
const task1 = Task.create({ cardTitle: "Task 1", complete : false });

router.get('/', (req, res) => 
Card.findAll({
    attributes: ['cardTitle', 'cardId']
})
.then(cards => {
    res.json(cards);
})
.catch(err => console.log(err)))


module.exports = router;