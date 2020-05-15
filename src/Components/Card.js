import React, {useState} from 'react';
import './card.css';
import Task from './Task';


export default function Card(props) {
    const [tasks, setTasks] = useState([]);
    const [add, setAdd] = useState('');
    const [changingTitle, setChangingTitle] = useState(props.needsTitle);
    const [title, setTitle] = useState(props.title);
    const [newTitle, setNewTitle] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (add === ''){
            return;
        }
        else{
           setTasks([...tasks, add]) 
           setAdd('')
        }
    }

    const updateTitle = (e) => {
        e.preventDefault();
        setTitle(newTitle)
        setChangingTitle(!changingTitle)
    }

    const handleRemove = (indexDel) => {
        setTasks(tasks.filter((task, index) => index !== indexDel));
    }

    return (
        <div className="card">
            <div className="title-div">
                {changingTitle
                    ?
                        <form action=""  onSubmit={updateTitle}>
                            <input
                                onChange={event => setNewTitle(event.target.value)}
                                type="text"
                                className="update-title"
                                placeholder={title}
                            />
                        </form>
                    :
                        <>
                        <h3 onClick={() => setChangingTitle(!changingTitle)}>{title}</h3>
                        </>   
                }

            </div>
            
            {tasks.map((task, index) => (
                <Task title={task} onDelete={() => handleRemove(index)} key={index}/>
            ))}

            <form className="add-task" action="input" onSubmit={handleSubmit}>
                <input value={add} type="text" placeholder="Add Task" onChange={event => setAdd(event.target.value)}/> 
                <button className="add-btn" >+</button>  
            </form>
            <button onClick={props.handleRemove} className="delete-card">Delete</button>
        </div>
    )
}
