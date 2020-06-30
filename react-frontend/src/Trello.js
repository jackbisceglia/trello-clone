// Packages
import React, {useState, useEffect, useContext} from 'react';
import { v4 as uuidv4 } from 'uuid';

// Context API
import { UserContext } from './userContext';
import { AuthContext } from './authContext';

// Child Components
import Navbar from './Components/Navbar';
import Card from './Components/Card';

// CSS Imports
import './App.css';
import './Components/card.css';

function Trello({ }) {
  const [cards, setCards] = useState([]);

  const [tasks, setTasks] = useState([]);

  const {userId, setUserId} = useContext(UserContext);
  const {authed, setAuthed} = useContext(AuthContext);

  console.log(userId);
  // Cards Call
  useEffect(() => {
    fetch('https://68.183.117.91.trellobackend.ga/cards/'+userId)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setCards([...cards, ...data]);
    })
    }, 
  []);

  // Tasks Call
  useEffect(() => {
    fetch('https://68.183.117.91.trellobackend.ga/tasks')
    .then(res => res.json())
    .then(data => {
      setTasks([...tasks, ...data]);
      })
    }, 
  []);

  // ------ CARD'S STATE ------
  // Update Card Title && Update State
  const updateCardTitle = (cardId, newName) => {
    let edit = cards.slice();
    edit.forEach(currCard => {
      if (currCard.cardid === cardId){
        console.log(currCard.cardTitle)
        currCard.cardtitle = newName;
      }
    })
    setCards(edit);

    fetch(`https://68.183.117.91.trellobackend.ga/cards/${cardId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cardTitle: newName
      })
    });
  }

  const addCard = () => {
    let nextCard = {
      cardtitle : `New Card (Update)`,
      cardid : uuidv4(),
    };

    setCards([...cards, nextCard]);

    fetch(`/cards`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cardId: nextCard.cardid,
        cardTitle: nextCard.cardtitle,
        user_id : userId
      })
    });
  }

  const deleteCard = (cardId) => {
    setTasks(tasks.filter(currTask => currTask.parentid !== cardId));
    setCards(cards.filter(currCard => currCard.cardid !== cardId));

    fetch(`/cards/${cardId}`, {
      method: 'DELETE'
      });
  }
  
  // ------ TASK'S STATE ------
  const updateTaskTitle = (taskId, newName) => {
    let edit = tasks.slice();
    edit.forEach(currTask => {
      if (currTask.taskid === taskId){
        currTask.tasktitle = newName
      }
    })
    setTasks(edit);

    fetch(`/${taskId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tasktitle: newName
      })
    });
  }

  // Add Task to Card & Update State
  const addTask = (parentCardId, addedTitle) => {
    const newTask = {
        taskid : uuidv4(),
        tasktitle : addedTitle,
        completed: false,
        parentid : parentCardId,
      };

      setTasks([...tasks, newTask]);

      fetch(`/tasks`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask)
      });
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(currTask => currTask.taskid !== taskId));

    fetch(`/tasks/${taskId}`, {
      method: 'DELETE'
      });
  }

  const strikeTask = (taskId) => {
    let edit = tasks.slice();
    edit.forEach(currTask => {
      if (currTask.taskid === taskId){
        let isStruck = currTask.completed;
        currTask.completed = !isStruck;

        fetch(`/tasks/completed/${taskId}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
      }
    })
    setTasks(edit);

  }

  // **** UI ****
  return (
    <>
    <Navbar /> 
    <div className="contain">
      {/* CARDS */}
      {cards.map(currCard => (
        <Card
          key={currCard.cardid}

          cardTitle={currCard.cardtitle}
          taskList={tasks.filter(curr => curr.parentid === currCard.cardid)}
          cardId={currCard.cardid}

          // Card Functions
          updateCardTitle={updateCardTitle}
          deleteCard={deleteCard}

          // Task Functions
          updateTaskTitle={updateTaskTitle}
          addTask={addTask}
          deleteTask={deleteTask}
          strikeTask={strikeTask}
          

        />
      ))}

      {/* NEW CARD */}
      <button className="new-list" onClick={() => addCard()}>+</button>
      <div className="padding-div"></div>
      {/* TEMP - DELETE */}
      {/* <button onClick={() => {
        console.table(cards)
        }}>See Cards</button>
      <button onClick={() => {
        console.table(tasks)
        }}>See Tasks</button> */}
    </div>
    </>
  );
}

export default Trello;