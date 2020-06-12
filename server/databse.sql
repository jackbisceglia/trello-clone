CREATE DATABASE trelloclone;

CREATE TABLE task(
    taskId VARCHAR(255) NOT NULL,
    taskTitle VARCHAR(255),
    completed BOOLEAN DEFAULT FALSE,
    parentId VARCHAR(255) NOT NULL,
    ord_no INTEGER PRIMARY KEY
);

CREATE TABLE card(
    cardId VARCHAR(255) NOT NULL,
    cardTitle VARCHAR(255)
);