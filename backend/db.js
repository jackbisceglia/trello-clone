const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./main.db3');  


// ---- Make Tables based on models ----
const createCardTable = () => {
    db.serialize(() =>  {  
        db.run("CREATE TABLE IF NOT EXISTS Card (cardTitle TEXT, cardId INTEGER)");  
    });
}
const createTaskTable = () => {
    db.serialize(() =>  {  
        db.run("CREATE TABLE IF NOT EXISTS Task (taskTitle TEXT, taskId INTEGER)");  
    });
}

// ---- Insert to tables ----
const addCard = (title, id) => {
    db.serialize(() => {  
        db.run(`INSERT into Card(cardTitle,cardId) VALUES ("${title}",${id})`);
    })
}
const addTask = (title, id) => {
    db.serialize(() => {  
        db.run(`INSERT into Task(taskTitle,taskId) VALUES ("${title}",${id})`);
    })
}

// ---- Updated tables ----
// - Cards -
const updateCardTitle = (oldTitle, newTitle) => {
    db.run(`UPDATE Card SET cardTitle = "${newTitle}" WHERE cardTitle = "${oldTitle}"`); 
}

const updateCardId = (oldId, newId) => {
    db.run(`UPDATE Card SET cardId = ${newId} WHERE cardId = ${oldId}`); 
}

// - Tasks -
const updateTaskTitle = (oldTitle, newTitle) => {
    db.run(`UPDATE Task SET taskTitle = "${newTitle}" WHERE taskTitle ="${oldTitle}"`); 
}

const updateTaskId = (oldId, newId) => {
    db.run(`UPDATE Task SET taskId = ${newId} WHERE taskId = ${oldId}`); 
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

addTask("Task 2", 145);
addTask("Task 3", 171);
addTask("Task 4", 778);

module.exports = db;