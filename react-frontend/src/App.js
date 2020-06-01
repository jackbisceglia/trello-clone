import React, {useState} from 'react';
import './App.css';
import './Components/card.css';
import Navbar from './Components/Navbar';
import Card from './Components/Card';

function App() {
  const [cards, setCards] = useState([
    {
      title : 'This is the title of the card',
      tasks : [['This is the task title', true]]
    },
    {
      title : 'This is the title of the card (2)',
      tasks : [['This is the task title (2)', true]]
    },
    {
      title : 'This is the title of the card (3)',
      tasks : [['This is the task title (3)', true]]
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
          tasks : [...curr.tasks, [taskTitle, false]]
        }
      } 
      return curr
    }))
  }

  // Get Help for more improved version of function
  // Old Update Task --> No Strikthrough
  // const updateTask = (oldName, strike, newName, cardTitle) => {
  //   let tempObj = cards.slice();
  //   tempObj.forEach(currEl => {
  //     if (currEl.title === cardTitle){
  //       let copyTasks = currEl.tasks.slice();
  //       let replace = copyTasks.indexOf([oldName, strike]);
  //       copyTasks[replace] = [newName, false];
  //       currEl.tasks = copyTasks
  //     }
  //   })
  //   setCards(tempObj); 
  // }
  
  // New Update Task --> With Strikthrough
  const updateTask = (taskArr, newName, cardTitle) => {
    let tempObj = cards.slice();
    tempObj.forEach(currEl => {
      if (currEl.title === cardTitle){
        let copyTasks = currEl.tasks.slice();
        let targetIndex = -1;
        copyTasks.forEach((task, index) => {
          if ((task[0] === taskArr[0]) && (task[1] === taskArr[1])){
            targetIndex = index;
          }
        })
        copyTasks[targetIndex] = [newName, taskArr[1]];
        currEl.tasks = copyTasks;
      }
    })
    setCards(tempObj); 
  }

  
  const deleteTask = (taskToDel, cardTitle) => {
    let tempObj = cards.slice();
    tempObj.forEach(currEl => {
      if (currEl.title === cardTitle){
        let copyTasks = currEl.tasks.slice();
        let targetIndex = -1;
        copyTasks.forEach((task, index) => {
          if ((task[0] === taskToDel[0]) && (task[1] === taskToDel[1])){
            targetIndex = index;
          }
        })
        copyTasks.splice(targetIndex, 1);
        currEl.tasks = copyTasks;
      }
    })
    setCards(tempObj);
  }

  const changeStrikeThrough = (taskArr, cardTitle) => {
    let tempObj = cards.slice();
    tempObj.forEach(currEl => {
      if (currEl.title === cardTitle){
        let copyTasks = currEl.tasks.slice();
        let targetIndex = -1;
        copyTasks.forEach((task, index) => {
          if ((task[0] === taskArr[0]) && (task[1] === taskArr[1])){
            targetIndex = index;
          }
        })
        copyTasks[targetIndex] = [taskArr[0], !taskArr[1]];
        console.log(copyTasks[targetIndex]);
        currEl.tasks = copyTasks;
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
        <Card 
          title={currCard.title}
          tasks={currCard.tasks}
          key={currCard.title}

          // CARD FUNCTIONS
          updateCardTitle={updateCard}
          addTaskState={addTask}
          removeCard={delCard}

          // TASK FUNCTIONS
          updateTask={updateTask}
          deleteTask={deleteTask}
          changeStrikeThrough={changeStrikeThrough}
        />
      ))}

      {/* NEW CARD */}
      <button
        className="new-list"
        onClick={() => setCards([...cards, {title : `Card ${cards.length + 1}`, tasks : []}])}
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