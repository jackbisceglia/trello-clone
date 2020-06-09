const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');
const Task = require('../models/Task');


const Card = db.define('card', {
    cardTitle: {
        type: Sequelize.STRING
    },
    cardId : {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    }
  });

Card.hasMany(Task, {
  foreignKey: 'cardId'
})

module.exports = Card;

