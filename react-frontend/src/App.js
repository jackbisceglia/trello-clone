import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
import './Components/card.css';
import Navbar from './Components/Navbar';
import Card from './Components/Card';

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get("/api/cards/")
      .then(res => {
        setCards([...cards,... res.data]);
      });
  }, []);

  // ------ CARD'S STATE ------
  // Update Card Title && Update State
  // Add Card
  const addCard = () => {
    const nextId = cards.length != 0 ? cards[cards.length - 1].id + 1 : 1
    const nextObj = {
      title: `Card ${cards.length + 1}`,
      tasks: [
        {
          title: "Add Task",
          strikethrough: false,
          id: 20
        }
      ],
      id : nextId
    }
    setCards([...cards, nextObj])

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nextObj),
    };
  
    fetch(`/api/cards/`, requestOptions);
  }
  
  const updateCard = (oldName, newName) => {
    let a = cards.slice();
    a.forEach(curr => {
      if (curr.title === oldName){
        curr.title = newName;
      }
    }) 
    setCards(a)

    const requestOptions = {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cards),
    }
  
    fetch(`/api/cards/`, requestOptions);
  }

  // Delete Card
  const delCard = (toDel, key) => {
    let a = cards.slice();

    a.forEach((curr, index) => {
      if (curr.title === toDel){
        a.splice(index, 1)
      }
    }) 
    setCards(a)

    const requestOptions = {
      method: 'DELETE'
    };
  
    fetch(`/api/cards/${key}`, requestOptions);
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
          key={currCard.id}
          id={currCard.id}

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
        onClick={() => addCard()}
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

// __________________________________________________________________________________________________________


// import React, {useState, useEffect} from 'react';
// import axios from 'axios'
// import './App.css';
// import './Components/card.css';
// import Navbar from './Components/Navbar';
// import Card from './Components/Card';


// function App() {
//   const [cards, setCards] = useState([]);


//   useEffect(() => {
//     axios.get("/api/cards/")
//       .then(res => {
//         setCards([...cards,... res.data]);
//       });
//   }, []);

//   // ------ CARD'S STATE ------
//   // Add Card
//   const addCard = () => {
//     const nextId = cards.length != 0 ? cards[cards.length - 1].id + 1 : 1
//     const nextObj = {
//       title: `Card ${cards.length + 1}`,
//       tasks: [
//         {
//           title: "Add Task",
//           strikethrough: false,
//           id: 20
//         }
//       ],
//       id : nextId
//     }
//     setCards([...cards, nextObj])

//     const requestOptions = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(nextObj),
//     };
  
//     fetch(`/api/cards/`, requestOptions);
//   }


//   // Update Card Title && Update State
//   const updateCard = (oldName, newName) => {
//     let a = cards.slice();
//     a.forEach(curr => {
//       if (curr.title === oldName){
//         curr.title = newName;
//       }
//     }) 
//     setCards(a)
//   }

//   // Delete Card
//   const delCard = (toDel, key) => {
//     let a = cards.slice();

//     a.forEach((curr, index) => {
//       if (curr.title === toDel){
//         a.splice(index, 1)
//       }
//     }) 
//     setCards(a)

//     const requestOptions = {
//       method: 'DELETE'
//     };
  
//     fetch(`/api/cards/${key}`, requestOptions);
//   }



//   // ------ TASK'S STATE ------
//   // Add Task to Card & Update State
//   const addTask = (card, taskTitle) => {
//     setCards(cards.map(curr => {
//       if (curr.title === card) {
//         return {
//           ...curr,
//           tasks : [...curr.tasks, [taskTitle, false]]
//         }
//       } 
//       return curr
//     }))
//   }
  
//   // New Update Task --> With Strikthrough
//   const updateTask = (taskArr, newName, cardTitle) => {
//     let tempObj = cards.slice();
//     tempObj.forEach(currEl => {
//       if (currEl.title === cardTitle){
//         let copyTasks = currEl.tasks.slice();
//         let targetIndex = -1;
//         copyTasks.forEach((task, index) => {
//           if ((task[0] === taskArr[0]) && (task[1] === taskArr[1])){
//             targetIndex = index;
//           }
//         })
//         copyTasks[targetIndex] = [newName, taskArr[1]];
//         currEl.tasks = copyTasks;
//       }
//     })
//     setCards(tempObj); 
//   }

  
//   const deleteTask = (taskToDel, cardTitle) => {
//     let tempObj = cards.slice();
//     tempObj.forEach(currEl => {
//       if (currEl.title === cardTitle){
//         let copyTasks = currEl.tasks.slice();
//         let targetIndex = -1;
//         copyTasks.forEach((task, index) => {
//           if ((task[0] === taskToDel[0]) && (task[1] === taskToDel[1])){
//             targetIndex = index;
//           }
//         })
//         copyTasks.splice(targetIndex, 1);
//         currEl.tasks = copyTasks;
//       }
//     })
//     setCards(tempObj);
//   }

//   const changeStrikeThrough = (taskArr, cardTitle) => {
//     let tempObj = cards.slice();
//     tempObj.forEach(currEl => {
//       if (currEl.title === cardTitle){
//         let copyTasks = currEl.tasks.slice();
//         let targetIndex = -1;
//         copyTasks.forEach((task, index) => {
//           if ((task[0] === taskArr[0]) && (task[1] === taskArr[1])){
//             targetIndex = index;
//           }
//         })
//         copyTasks[targetIndex] = [taskArr[0], !taskArr[1]];
//         console.log(copyTasks[targetIndex]);
//         currEl.tasks = copyTasks;
//       }
//     })
//     setCards(tempObj); 
//   }

//   // **** UI ****
//   return (
//     <>
//     <Navbar /> 
//     <div className="contain">
      
//       {/* CARDS */}
//       {cards.map(currCard => (
//         <Card 
//           title={currCard.title}
//           tasks={currCard.tasks}
//           id={currCard.id}
//           key={currCard.id}

//           // CARD FUNCTIONS
//           updateCardTitle={updateCard}
//           addTaskState={addTask}
//           removeCard={delCard}

//           // TASK FUNCTIONS
//           updateTask={updateTask}
//           deleteTask={deleteTask}
//           changeStrikeThrough={changeStrikeThrough}
//         />
//       ))}

//       {/* NEW CARD */}
//       <button
//         className="new-list"
//         onClick={() => addCard()}
//         >New Task
//       </button>

//       {/* TEMP - DELETE */}
//       <button onClick={() => {
//         console.log(cards)
//         }}>See State</button>

//     </div>
//     </>
//   );
// }

// export default App;