import React, {useState} from 'react'

export default function NewTask({taskName, updateTask, parentTitle, deleteTask}) {
    const [isTitleChanging, setIsTitleChanging] = useState(false);
    const [taskChange, setTaskChange] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskChange === ''){
            return;
        }
        else{
           updateTask(taskName, taskChange, parentTitle);
           setTaskChange('');
           setIsTitleChanging(!isTitleChanging);
        }
    }

    
    return (
        <>
        <div className="task">
            {isTitleChanging
                ?
                    <form className="update-form" onSubmit={event => handleSubmit(event)}>
                        <input 
                            onChange={event => setTaskChange(event.target.value)}
                            className="update-task" 
                            type="text" placeholder={taskName}
                        />
                    </form>
                :
                    <p className="title" onClick={() => setIsTitleChanging(!isTitleChanging)}> {taskName} </p>
            }
            <div className="buttons">
                <button className="edit-task" onClick={() => setIsTitleChanging(!isTitleChanging)}></button>
                <button className="delete" onClick={() => deleteTask(taskName, parentTitle)}>X</button>
            </div>
        </div>
        </>

    )
}
