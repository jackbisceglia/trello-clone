const { v4: uuidv4 } = require('uuid');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./main.db3');  


// ---- Make Tables based on models ----
const createCardTable = () => {
    db.serialize(() =>  {  
        db.run("CREATE TABLE IF NOT EXISTS Card (cardTitle TEXT NOT NULL, cardId TEXT PRIMARY KEY)");  
    });
}
const createTaskTable = () => {
    db.serialize(() =>  {  
        db.run(`CREATE TABLE IF NOT EXISTS Task (
            taskTitle TEXT NOT NULL,
            taskId TEXT PRIMARY KEY,
            completed INTEGER DEFAULT 0,
            cardId TEXT,
            FOREIGN KEY (cardId)
                REFERENCES Card (cardId))`);  
    });
}

// ---- Insert to tables ----
const addCard = (title, id) => {
    db.serialize(() => {  
        db.run(`INSERT into Card(cardTitle,cardId) VALUES ('${title}','${id}')`);
    })
}
const addTask = (title, id, completed, card) => {
    db.serialize(() => {  
        db.run(`INSERT into Task(taskTitle,taskId,completed,cardId) VALUES ('${title}','${id}', ${completed},'${card}')`);
    })
}

// ---- Updated tables ----
// - Cards -
const updateCardTitle = (oldTitle, newTitle) => {
    db.run(`UPDATE Card SET cardTitle = "${newTitle}" WHERE cardTitle = "${oldTitle}"`); 
}

const updateCardId = (oldId, newId) => {
    db.run(`UPDATE Card SET cardId = "${newId}" WHERE cardId = "${oldId}"`); 
}

// - Tasks -
const updateTaskTitle = (oldTitle, newTitle) => {
    db.run(`UPDATE Task SET taskTitle = "${newTitle}" WHERE taskTitle ="${oldTitle}"`); 
}

const updateTaskId = (oldId, newId) => {
    db.run(`UPDATE Task SET taskId = "${newId}" WHERE taskId = "${oldId}"`); 
}

// ---- Updated tables ----
// - Cards -
const deleteCard = (titleToDel) => {
    db.run(`DELETE FROM Card WHERE cardTitle = "${titleToDel}"`); 
}

// - Tasks -
const deleteTask = (titleToDel) => {
    db.run(`DELETE FROM Task WHERE taskTitle = "${titleToDel}"`); 
}

createCardTable();
createTaskTable();


addTask("Task 2", `${uuidv4()}`, 0, "5a453c2a-99d1-49fa-ad52-82a43f6b6f18");
addTask("Task 3", `${uuidv4()}`, 1, "870ecf61-ec3c-454f-a619-09bf6e0716d4");
addTask("Task 4", `${uuidv4()}`, 0, "5a453c2a-99d1-49fa-ad52-82a43f6b6f18");


module.exports = db;