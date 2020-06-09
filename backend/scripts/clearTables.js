const db = require("../db");
const { Sequelize, DataTypes } = require("sequelize");
const readline = require("readline");
const Card = require("../models/Card");
const Task = require("../models/Task");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


rl.question("Clear T, C, or Both(t/c/b)? ", function (whichOne) {
    if (whichOne === 't' || whichOne === 'b'){
        Task.destroy({
            truncate: true
            })
    }
    if (whichOne === 'c' || whichOne === 'b'){
        Card.destroy({
            truncate: true
          })
    }
  rl.close();
});
