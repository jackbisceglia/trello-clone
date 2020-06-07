const express = require('express');
const app = express();

var sqlite3 = require('sqlite3').verbose();

const dbsource = "db.sqlite";

const cards = [
    {
      cardTitle : `Home Depot Run`,
      cardId : "id0"
    },
    {
      cardTitle : `Shaw's List`,
      cardId : "id00"
    },
    {
      cardTitle : `CS Project Specs`,
      cardId : "id000"
    }
  ]
  
  const tasks = [
    {
      taskTitle : "Get 2x4's",
      completed: false,
      parentCard : "id0",
      taskId : "id9452",
    },
    {
      taskTitle : "Get Steel",
      completed: false,
      parentCard : "id0",
      taskId : "id9354",
    },
    {
      taskTitle : "Bread",
      completed: false,
      parentCard : "id00",
      taskId : "id9172",
    },
    {
      taskTitle : "Salami",
      completed: false,
      parentCard : "id00",
      taskId : "id5966",
    },
    {
      taskTitle : "Coffee Beans",
      completed: false,
      parentCard : "id00",
      taskId : "id2245",
    },
    {
      taskTitle : "1% Milk",
      completed: false,
      parentCard : "id00",
      taskId : "id1178",
    },
    {
      taskTitle : "Finish Project",
      completed: false,
      parentCard : "id000",
      taskId : "id2336",
    }
  ]

app.get('/', (req, res) => {
    res.json({"message" : "ok"});
});

app.get('/cards', (req, res) => {
    res.json(cards);
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});


app.listen(5000)