import React, {useState} from 'react'
import './task.css';

export default function Task({task, updateTask, parentTitle, deleteTask, changeStrikeThrough}) {
    const [isTitleChanging, setIsTitleChanging] = useState(false);
    const [taskChange, setTaskChange] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskChange === ''){
            return;
        }
        else{
           updateTask(task, taskChange, parentTitle);
           setTaskChange('');
           setIsTitleChanging(!isTitleChanging);
        }
    }

    const strikeThrough = task[1];

    
    return (
        <>
        <div className="task">
            {isTitleChanging
                ?
                    <form className="update-form" onSubmit={event => handleSubmit(event)}>
                        <input 
                            onChange={event => setTaskChange(event.target.value)}
                            className="update-task" 
                            type="text" placeholder={task[0]}
                        />
                    </form>
                :
                    <p 
                        className="title"
                        onClick={() => changeStrikeThrough(task, parentTitle)}
                        style={strikeThrough ? {textDecoration: 'line-through', textDecorationWidth: '100px', textDecorationThickness: '100px', fontStyle: 'italic'} : {textDecoration: 'none'}}> 
                        {task[0]} 
                    </p>
            }
            <div className="buttons">
                <button className="edit-task" onClick={() => setIsTitleChanging(!isTitleChanging)}></button>
                <button className="delete" onClick={() => deleteTask(task, parentTitle)}>X</button>
            </div>
        </div>
        </>

    )
}
