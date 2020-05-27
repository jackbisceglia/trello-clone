import React, {useState} from 'react';
import NewTask from './NewTask';

export default function NewCard({title, tasks, updateCardTitle, removeCard, addTaskState, updateTask, deleteTask}) {
    const [isTitleChanging, setIsTitleChanging] = useState(false);

    const [titleChange, setTitleChange] = useState('');
    
    const [taskAdd, setTaskAdd] = useState('');

    const handleSubmit = (e, st, setSt, funct) => {
        e.preventDefault();
        if (st === ''){
            return;
        }
        else{
           funct(title, st)
           setSt('')
        }
    }

    return (
        <div className="card">
            <div className="title-div">
                {isTitleChanging
                    ?
                        <form action="" onSubmit={event => handleSubmit(event, titleChange, setTitleChange, updateCardTitle)}>
                            <input 
                                onChange={event => setTitleChange(event.target.value)}
                                className="update-title" 
                                type="text" placeholder={title}
                            />
                        </form>
                    :
                        <h3
                            onClick={() => setIsTitleChanging(!isTitleChanging)}
                            >
                            {title}
                        </h3>
                }

            </div>

            {tasks.map(currTask => (
                <NewTask taskName={currTask} key={currTask} updateTask={updateTask} parentTitle={title} deleteTask={deleteTask}/>
            ))}

            <form className="add-task" action="input" onSubmit={event => handleSubmit(event, taskAdd, setTaskAdd, addTaskState)}>
                <input value={taskAdd} type="text" placeholder="Add Task" onChange={event => setTaskAdd(event.target.value)}/> 
                <button className="add-btn" >+</button>  
            </form>
            
            <button className="delete-card" onClick={() => removeCard(title)}>Delete</button>
        </div>
    )
}
