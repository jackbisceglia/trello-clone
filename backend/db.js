const express = require('express');
const sqlite3 = require('sqlite3');
const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'C:/Programming/trello-clone/backend/main.sqlite'
});


module.exports = db;