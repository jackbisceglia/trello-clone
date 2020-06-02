import React, {useState} from 'react'
import './task.css';

export default function Task({task}) {
    const [isTitleChanging, setIsTitleChanging] = useState(false);
    const [taskChange, setTaskChange] = useState('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (taskChange === ''){
    //         return;
    //     }
    //     else{
    //        updateTask(task, taskChange, parentTitle);
    //        setTaskChange('');
    //        setIsTitleChanging(!isTitleChanging);
    //     }
    // }
    
    return (
        <>
        <div className="task">
            {isTitleChanging
                ?
                    <form className="update-form" >
                        <input 
                            onChange={event => setTaskChange(event.target.value)}
                            className="update-task" 
                            type="text" placeholder={task[0]}
                        />
                    </form>
                :
                    <p 
                        className="title"
                        // style={strikeThrough ? {textDecoration: 'line-through', textDecorationWidth: '100px', textDecorationThickness: '100px', fontStyle: 'italic'} : {textDecoration: 'none'}}
                    > 
                        {task} 
                    </p>
            }
            <div className="buttons">
                <button className="edit-task"></button>
                <button className="delete">X</button>
            </div>
        </div>
        </>

    )
}
