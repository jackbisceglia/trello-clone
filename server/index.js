// Server Packages
const express = require('express');
const cors = require('cors');

// DATABASE
const pool = require('./db');
 
// Session Packages
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

// Utility Packages/Functions
const { v4: uuidv4 } = require('uuid');
const isValidPass = (currPass) => {
    let hasNumber = false;
    let hasCapLetter = false;
    let isLongEnough = false;

    if (currPass.length >= 5) {
        isLongEnough = true;
    }

    for (let i = 0; i < currPass.length; i++) {
        if (isCap(currPass.charAt(i))){
            hasCapLetter = true;
        }
        else if (isNumber(currPass.charAt(i))){
            hasNumber = true;
        }

        if (hasNumber && hasCapLetter && isLongEnough){
            return true;
        }
    }

    return false;
}
const isLetter = (character) => {
    return character.toUpperCase() !== character.toLowerCase();
}
const isNumber = (character) => {
    if (character >= '0' && character <= '9') {
        return true;
    }
    else {
        return  false;
    }
}
const isCap = (character) => {
    if (!isLetter(character)){
        return false;
    }
    else{
        if (character.toUpperCase() === character){
            return true
        }
        else {
            return false
        }
    }
}


// Initialize App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
        store: new pgSession({
            pool : pool,
            tableName : 'user_sessions'
        }),
        secret : 'secret',
        resave : true,
        saveUninitialized : true,
        cookie : {
            maxAge : 1000 * 60 * 60 * 24,
            secure : false,
            httpOnly : false
        }
        
    }
));

// ROUTES
// ---- AUTH ROUTES ----
app.get('/active', async (req, res, next) => {
    try {
        const user_id = req.session.user_id;
        console.log(user_id);
        const userMatch = await pool.query(
            "SELECT userid FROM users WHERE userid = $1",
            [user_id]
        );
        console.log(userMatch)
        
        if (userMatch.rows.length){
            res.json({
                sessionActive : true,
                userId : user_id
            })
        }
        else {
            res.json({
                sessionActive : false,
                userId : null
            })  
        }
    }
    catch (error) {
      console.error(error.message)
    }
})


app.delete('/signout', function(req, res) {
    req.session.destroy((err) => {
       if(err){
          console.log(err);
       }
       else{
           req.destroy();
       }
    });
});



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
            "SELECT * FROM Task ORDER BY ord_no"
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
        const {cardTitle, cardId, user_id} = req.body;

        const newCard = await pool.query(
            "INSERT INTO card (cardId, cardTitle, user_id) VALUES($1, $2, $3) RETURNING *",
            [cardId, cardTitle, user_id]
        );
        
        res.json(newCard.rows[0]);
    }
    catch (error) {
      console.error(error.message)
    }
});

// All
app.get('/cards/:user_id', async (req, res) => {
    const { user_id } = req.params;

    try {
        const allCards = await pool.query(
            "SELECT * FROM card WHERE user_id = $1 ORDER BY order_id", [user_id]
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
        let sessionData = req.session;
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
            sessionData.user_id = queryResponse.rows[0].userid;
            console.log(sessionData.user_id);
            res.json({
                success : true,
                email : queryResponse.rows[0].email,
                userid : queryResponse.rows[0].userid,
                sessionData : sessionData
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
        if (pass === passConfirm && isValidPass(pass)){
            const queryResponse = await pool.query(
                "INSERT INTO users (email, pass, userid) VALUES ($1, crypt($2, gen_salt('bf')), $3);",
                [email, pass, uuidv4()]
            );

            res.json({
                success : true,
                error : null
            })

        }
        else {
            if (pass !== passConfirm && !isValidPass(pass)){
                res.json({
                    success : false,
                    error : "Passwords Don't Match Nor Are Valid"
                })
            }
            else if (!isValidPass(pass)) {
                res.json({
                    success : false,
                    error : "Passwords Not Valid"
                })
            }
            else {
                // Both
                res.json({
                    success : false,
                    error : "Passwords Don't Match"
                })
            }
        }
    }
    catch (error) {
      console.error(error.message)
    }
});


// SERVER LISTEN/START
app.listen(5000, () => {
    console.log("Server has started");
});