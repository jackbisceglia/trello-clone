import React, {useState} from 'react';
import './card.css';
import Task from './Task';

export default function Card({
    cardTitle, taskList, cardId,
    updateCardTitle, deleteCard,
    updateTaskTitle, addTask, deleteTask, strikeTask
}) 
{
    const [newCardTitle, setNewCardTitle] = useState('');
    const [cardTitleChangeBool, setCardTitleChangeBool] = useState(false);

    const [addTaskTitle, setAddTaskTitle] = useState('')

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        if (newCardTitle === ''){
            return;
        }
        else{
           updateCardTitle(cardId, newCardTitle)
           setCardTitleChangeBool(!cardTitleChangeBool)
           setNewCardTitle('')
        }
    }

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (addTaskTitle === ''){
            return;
        }
        else{
           addTask(cardId, addTaskTitle);
           setAddTaskTitle('');
        }
    }
    // onSubmit={event => handleUpdateSubmit(event)} -> form onSubmit
    return (
        <div className="card">
            <div className="title-div">
                {cardTitleChangeBool
                    ?
                        <form action="" onSubmit={event => handleUpdateSubmit(event)}>
                            <input 
                                onChange={event => setNewCardTitle(event.target.value)}
                                className="update-title" 
                                type="text"
                                placeholder={cardTitle}
                            />
                        </form>
                    :
                        <h3 onClick={() => setCardTitleChangeBool(!cardTitleChangeBool)}>
                            {cardTitle}
                        </h3>
                }

            </div>

            {taskList.map(curr => (
                <Task 
                    key={curr.taskid}

                    // Task Properties
                    taskTitle={curr.tasktitle}
                    taskId={curr.taskid}
                    taskCompleted={curr.completed}
                    parentId={cardId}

                    // Task Functions
                    updateTaskTitle={updateTaskTitle}
                    deleteTask={deleteTask}
                    strikeTask={strikeTask}
                />
            ))}

            <form className="add-task" action="input" onSubmit={event => handleAddSubmit(event)}>
                {/* Value field to reset */}
                <input type="text" placeholder="Add Task" value={addTaskTitle} onChange={event => setAddTaskTitle(event.target.value)}/> 
                <button className="add-btn" >+</button>  
            </form>
            
            <button className="delete-card" onClick={() => deleteCard(cardId)}>Delete</button>
        </div>
    )
}
