const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ROUTES

// ----- CRUD TASKS ----- 
app.post('/tasks', async (req, res) => {
    try {
        const {taskTitle, taskId, completed, parentId} = req.body;

        const newTask = await pool.query(
            "INSERT INTO task (taskId, taskTitle, completed, parentId) VALUES($1, $2, $3, $4) RETURNING *",
            [taskId, taskTitle, completed, parentId]
        );
        
        res.json(newTask.rows[0]);
    }
    catch (error) {
      console.error(error.message)
    }
});

// ALL
app.get('/tasks', async (req, res) => {
    try {
        const allTasks = await pool.query(
            "SELECT * FROM Task"
        )
        res.json(allTasks.rows);
    } 
    catch (error) {
      console.error(error.message)  
    }
});

// By ID
app.get("/tasks/:target", async (req, res) => {
    try {
        const { target } = req.params;

        const task = await pool.query(
            "SELECT * FROM Task WHERE taskId = $1", 
            [target]
        );
        
            res.json(task.rows[0]);
    } 
    
    catch (error) {
      console.error(error.message)  
    }
});

app.put("/tasks/:target", async (req, res) => {
    try {
        const {target} = req.params;
        const {taskTitle} = req.body;

        const updateTask = await pool.query(
            "UPDATE Task SET taskTitle = $1 WHERE taskId = $2",
            [taskTitle, target]
        );
        res.json("Todo updated")
    }
    catch (error) {
        console.error(error);    
    }
});

app.delete("/tasks/:target", async (req, res) => {
    try {
        const {target} = req.params;

        const deleteTask = await pool.query(
            "DELETE FROM Task WHERE taskId = $1",
            [target]
        );
        res.json("Todo deleted");
    }
    catch (error) {
        console.error(error);    
    }
});
 

// ----- CRUD CARDS ----- 
app.post('/cards', async (req, res) => {
    try {
        const {cardTitle, cardId} = req.body;

        const newCard = await pool.query(
            "INSERT INTO card (cardId, cardTitle) VALUES($1, $2) RETURNING *",
            [cardId, cardTitle]
        );
        
        res.json(newCard.rows[0]);
    }
    catch (error) {
      console.error(error.message)
    }
});

// All
app.get('/cards', async (req, res) => {
    try {
        const allCards = await pool.query(
            "SELECT * FROM card"
        )
        res.json(allCards.rows);
    } 
    catch (error) {
      console.error(error.message)  
    }
});

// By ID
app.get("/cards/:target", async (req, res) => {
    try {
        const { target } = req.params;

        const card = await pool.query(
            "SELECT * FROM card WHERE cardId = $1", 
            [target]
        );
        
        res.json(card.rows[0]);
    } 
    
    catch (error) {
      console.error(error.message)  
    }
});

app.put("/cards/:target", async (req, res) => {
    try {
        const {target} = req.params;
        const {cardTitle} = req.body;

        const updateTask = await pool.query(
            "UPDATE card SET cardTitle = $1 WHERE cardId = $2",
            [cardTitle, target]
        );
        res.json("Todo updated")
    }
    catch (error) {
        console.error(error);    
    }
});


// SERVER LISTEN/START
app.listen(5000, () => {
    console.log("Server has started");
})