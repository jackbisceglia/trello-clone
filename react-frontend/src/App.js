import React, {useState, useEffect} from 'react';
import nextId from "react-id-generator";

import './App.css';
import './Components/card.css';
import Navbar from './Components/Navbar';
import Card from './Components/Card';

function App() {
  const [cards, setCards] = useState([]);

  const [tasks, setTasks] = useState([]);


  // Cards Call
  useEffect(() => {
    fetch('/cards')
    .then(res => res.json())
    .then(data => {
      setCards([...cards, ...data])
      })
    }, 
  []);

  // Tasks Call
  useEffect(() => {
    fetch('/tasks')
    .then(res => res.json())
    .then(data => {
      setTasks([...tasks, ...data])
      })
    }, 
  []);


  // ------ CARD'S STATE ------
  // Update Card Title && Update State
  const updateCardTitle = (cardId, newName) => {
    let edit = cards.slice();
    edit.forEach(currCard => {
      if (currCard.cardId === cardId){
        currCard.cardTitle = newName;
      }
    })
    setCards(edit);
  }

  const addCard = () => {
    let nextCard = {
      cardTitle : `Card ${cards.length + 1} (update)`,
      cardId : nextId(),
    };

    setCards([...cards, nextCard]);
  }

  const deleteCard = (cardId) => {
    setTasks(tasks.filter(currTask => currTask.parentCard !== cardId));
    setCards(cards.filter(currCard => currCard.cardId !== cardId));
  }
  

  // ------ TASK'S STATE ------
  const updateTaskTitle = (taskId, newName) => {
    let edit = tasks.slice();
    edit.forEach(currTask => {
      if (currTask.taskId === taskId){
        currTask.taskTitle = newName
      }
    })
    setTasks(edit);
  }
  
  const addTask = (parentCardId, addedTitle) => {
    const newTask = {
        taskTitle : addedTitle,
        completed: false,
        parentCard : parentCardId,
        taskId : nextId(),
      };

      setTasks([...tasks, newTask]);
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(currTask => currTask.taskId !== taskId));
  }
  // Add Task to Card & Update State

  // **** UI ****
  return (
    <>
    <Navbar /> 
    <div className="contain">
      
      {/* CARDS */}
      {cards.map(currCard => (
        <Card
          key={currCard.cardId}

          cardTitle={currCard.cardTitle}
          taskList={tasks.filter(curr => curr.parentCard === currCard.cardId)}
          cardId={currCard.cardId}

          // Card Functions
          updateCardTitle={updateCardTitle}
          deleteCard={deleteCard}

          // Task Functions
          updateTaskTitle={updateTaskTitle}
          addTask={addTask}
          deleteTask={deleteTask}
          

        />
      ))}

      {/* NEW CARD */}
      <button className="new-list" onClick={() => addCard()}>New Card</button>

      {/* TEMP - DELETE */}
      <button onClick={() => {
        console.table(cards)
        }}>See Cards</button>
      <button onClick={() => {
        console.table(tasks)
        }}>See Tasks</button>
    </div>
    </>
  );
}

export default App;