const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');
const Card = require('../models/Card');

const Task = db.define('task', {
    taskTitle: {
        type: Sequelize.STRING
    },
    completed : {
        type : Sequelize.BOOLEAN
    },
    taskId : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    }
});

Task.belongsTo(Card)

module.exports = Task;
