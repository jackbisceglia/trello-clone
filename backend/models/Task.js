const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Task = db.define('task', {
    taskTitle: {
        type: Sequelize.STRING
    },
    completed : {
        type : Sequelize.BOOLEAN,
        defaultValue : false
    },
    taskId : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    }
});


module.exports = Task;