import React, {useState} from 'react';
import './App.css';
import './Components/card.css';
import Navbar from './Components/Navbar';
import Card from './Components/Card';
import NewCard from './Components/NewCard';

function App() {
  const [cards, setCards] = useState([
    {
      title : 'card 1',
      tasks : ['a', 'b', 'c']
    },
    {
      title : 'card 2',
      tasks : ['d', 'e', 'f']
    }
  ]);

  // ------ CARD'S STATE ------
  // Update Card Title && Update State
  const updateCard = (oldName, newName) => {
    let a = cards.slice();
    a.forEach(curr => {
      if (curr.title === oldName){
        curr.title = newName;
      }
    }) 
    setCards(a)
  }

  // Delete Card
  const delCard = (toDel) => {
    let a = cards.slice();

    a.forEach((curr, index) => {
      if (curr.title === toDel){
        a.splice(index, 1)
      }
    }) 
    setCards(a)
  }


  // ------ TASK'S STATE ------
  // Add Task to Card & Update State
  const addTask = (card, taskTitle) => {
    setCards(cards.map(curr => {
      if (curr.title === card) {
        return {
          ...curr,
          tasks : [...curr.tasks, taskTitle]
        }
      } 
      return curr
    }))
  }

  const updateTask = (oldName, newName, cardTitle) => {
    let tempObj = cards.slice();
    tempObj.forEach(currEl => {
      if (currEl.title === cardTitle){
        let copyTasks = currEl.tasks.slice();
        let replace = copyTasks.indexOf(oldName);
        copyTasks[replace] = newName;
        currEl.tasks = copyTasks
      }
    })
    setCards(tempObj); 
  }

  // **** UI ****
  return (
    <>
    <Navbar /> 
    <div className="contain">
      
      {/* CARDS */}
      {cards.map(currCard => (
        <NewCard 
          title={currCard.title}
          tasks={currCard.tasks}
          key={currCard.title}

          // CARD FUNCTIONS
          updateCardTitle={updateCard}
          addTaskState={addTask}
          removeCard={delCard}

          // TASK FUNCTIONS
          updateTask={updateTask}
        />
      ))}

      {/* NEW CARD */}
      <button
        className="new-list"
        onClick={() => setCards([...cards, {title : `card ${cards.length + 1}`, tasks : ['j', 'k', 'l']}])}
        >New Task
      </button>

      {/* TEMP - DELETE */}
      <button onClick={() => {
        console.log(cards)
        }}>See State</button>

    </div>
    </>
  );
}

export default App;
