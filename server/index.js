const express = require('express');
const cors = require('cors');
const pool = require('./db');
const { v4: uuidv4 } = require('uuid');
const e = require('express');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ROUTES

// ----- CRUD TASKS ----- 
app.post('/tasks', async (req, res) => {
    try {
        const {tasktitle, taskid, completed, parentid} = req.body;

        const newTask = await pool.query(
            "INSERT INTO task (taskId, taskTitle, completed, parentId) VALUES($1, $2, $3, $4) RETURNING *",
            [taskid, tasktitle, completed, parentid]
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
            "SELECT * FROM Task ORDER BY order_id"
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
        const {tasktitle} = req.body;

        const updateTask = await pool.query(
            "UPDATE Task SET taskTitle = $1 WHERE taskId = $2",
            [tasktitle, target]
        );
        res.json("Todo updated")
    }
    catch (error) {
        console.error(error);    
    }
});

app.put("/tasks/completed/:target", async (req, res) => {
    try {
        const {target} = req.params;

        const updateTask = await pool.query(
            "UPDATE Task SET completed = NOT completed WHERE taskId = $1",
            [target]
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
            "SELECT * FROM card ORDER BY order_id"
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
        res.json("Card updated");
        console.log(req.body);
    }
    catch (error) {
        console.error(error);    
    }
});

app.delete("/cards/:target", async (req, res) => {
    try {
        const {target} = req.params;

        const deleteCard = await pool.query(
            "DELETE FROM Card WHERE cardid = $1",
            [target]
        );
        const allTasks = await pool.query(
            "DELETE FROM Task WHERE parentid = $1",
            [target]
        );
        res.json("Card deleted");
    }
    catch (error) {
        console.error(error);    
    }
});

// Login Routes
app.post('/login', async (req, res) => {
    try {
        const {email, pass} = req.body;

        const queryResponse = await pool.query(
            "SELECT userid, email FROM users WHERE email = $1 AND pass = crypt($2, pass);",
            [email, pass]
        );


        if (queryResponse.rows.length === 0){
            res.json({
                success : false
            })
        }
        else{
            res.json({
                success : true,
                userid : queryResponse.rows[0],
                useremail : queryResponse.rows[1]
            })
        }
    }
    catch (error) {
      console.error(error.message)
    }
});

app.post('/signup', async (req, res) => {
    try {
        const {email, pass, passConfirm} = req.body;

        if (pass === passConfirm){
            const queryResponse = await pool.query(
                "INSERT INTO users (email, pass, userid) VALUES ($1, crypt($2, gen_salt('bf')), $3);",
                [email, pass, uuidv4()]
            );

            res.json({
                success : true
            })

        }
        else {
            res.json({
                success: false
            })
        }


    }
    catch (error) {
      console.error(error.message)
    }
});
// SERVER LISTEN/START
app.listen(5000, () => {
    console.log("Server has started");
})