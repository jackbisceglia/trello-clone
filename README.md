# Trello Clone
A Full Stack clone of Trello with the __PERN__ stack (PostgreSQL/Express/React/Node)

## Description
Trello Clone is a fully functioning task management Web App. The App supports personal Task Boards, allowing 
simple and organized task tracking that separates overarching goals or topics from specific tasks. Trello Clone
has both a minimal and clean UI that promotes well organized tasking.
Landing Page             |  Main App
:-------------------------:|:-------------------------:
![](https://dl.dropboxusercontent.com/s/1kfggoalknf4nfq/Trello%20Landing%20Page.png?dl=0)  |  ![](https://dl.dropboxusercontent.com/s/ek274x8j0izxu4x/Trello%20Main%20Page.png?dl=0)

## Features
* UI written in modern __React__, using ES6 principles and functional components with React Hooks
* Local frontend state management with the Context API
* UI written exclusively with custom CSS styling 
* Bootstrapped with create-react-app
* Backend written in __NodeJS/Express__
* Relational data storage with __PostgreSQL__
* User details managed with HTTPS REST architecture
* Sessions managed with local storage

## Installation
* Install PostgreSQL and create a db named trelloclone and create tables with queries in ```server\data.sql```
* Clone this repository ```https://github.com/jackbisceglia/trello-clone.git```
* Update Postgre user details in ```server\db.js```
* Run ```npm install``` in both ```server``` and ```react-frontend ``` to install dependencies
* cd into ```server``` and ```react-frontend```, and ```npm start``` respectively to spin API and Frotend servers
* Frontend should be running on ```http://localhost:3000``` and Express API on ```http://localhost:5000```

## Live App
* __The Live App is currently under maintenance, fixing backend API solutions__
https://trello-clone-jackb.netlify.app/
Sign up or use demo account:
* __Email__: demo@gmail.com
* __Password__ Demo123 (case-sensitive)
