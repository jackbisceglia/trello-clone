const db = require("../db");
const { Sequelize, DataTypes } = require("sequelize");
const readline = require("readline");
const Card = require("../models/Card");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


rl.question("Card Title? ", function (title) {
  Card.sync().then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return Card.create({
      cardTitle : title
    });
  });
  rl.close();
});
