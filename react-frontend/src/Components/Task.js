import React, {useState} from 'react'
import './task.css';

export default function Task({
    taskTitle, taskId, taskCompleted, parentId, 
    updateTaskTitle, deleteTask, strikeTask
}) 
{
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [taskTitleChangeBool, setTaskTitleChangeBool] = useState(false);

    const [isCompleted, setIsCompleted] = useState(taskCompleted);

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        if (newTaskTitle === ''){
            return;
        }
        else{
           updateTaskTitle(taskId, newTaskTitle);
           setNewTaskTitle('');
           setTaskTitleChangeBool(!taskTitleChangeBool);
        }
    }

    const handleStrike = () => {
        strikeTask(taskId);
        setIsCompleted(!isCompleted);
    }

    
    return (
        <>
        <div className="task">
            {taskTitleChangeBool
                ?
                    <form className="update-form" onSubmit={event => handleUpdateSubmit(event)}>
                        <input 
                            className="update-task" 
                            type="text" 
                            placeholder={taskTitle}
                            onChange={event => setNewTaskTitle(event.target.value)}
                        />
                    </form>
                :
                    <>
                    <p 
                        onClick={() => handleStrike(taskId)}
                        className="title"
                        style={isCompleted ? {textDecoration: 'line-through', textDecorationWidth: '100px', textDecorationThickness: '100px', fontStyle: 'italic'} : {textDecoration: 'none',}}> 
                        {taskTitle} 
                    </p>
                    </>
            }
            <div className="buttons">
                <button 
                    className="edit-task"
                    onClick={() => setTaskTitleChangeBool(!taskTitleChangeBool)}>
                </button>

                <button
                    className="delete"
                    onClick={() => deleteTask(taskId)}
                >X</button>
            </div>
        </div>
        </>

    )
}
