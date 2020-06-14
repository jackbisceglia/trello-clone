CREATE DATABASE trelloclone;

CREATE TABLE task(
    taskId VARCHAR(255) NOT NULL,
    taskTitle VARCHAR(255),
    completed BOOLEAN DEFAULT FALSE,
    parentId VARCHAR(255) NOT NULL,
    ord_no INTEGER PRIMARY KEY
);

CREATE TABLE users(
    tableid SERIAL PRIMARY KEY,
    userid VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pass VARCHAR(255)
);

SELECT id 
  FROM users
 WHERE email = 'jbisceglia2000@gmail.com' 
   AND password = crypt('pass', password);