const db = require('../db');
const { Sequelize, DataTypes } = require('sequelize');
const readline = require("readline");
const Task = require('../models/Task');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let updates = {
    taskName : '',
    completed : 0
}

rl.question("Task ? ", function(task) {
    rl.question("Completed? ", function(complete) {
        updates.taskName = task;
        (complete === 'n' || complete === 'N') ? updates.completed = false : updates.completed = true
        Task.sync().then(() => {
            // Now the `users` table in the database corresponds to the model definition
            return Task.create({
              taskTitle: updates.taskName,
              completed: updates.completed
            });
          });
        console.log(updates)
        
        rl.close();
    });
});
