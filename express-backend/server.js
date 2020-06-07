// Packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json())

const port = process.env.PORT || 8080;

// API Routes
const router = express.Router();

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

// Home page route.
router.get('/cards', function (req, res) {
  res.json(cards);
})

// About page route.
router.get('/tasks', function (req, res) {
  res.json(tasks);
})

app.use('/', router);

// Start port
app.listen(port);