import React, {useState} from 'react';
import './card.css';
import Task from './Task';


export default function Card(props) {
    const [tasks, setTasks] = useState([]);
    const [add, setAdd] = useState('');

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

    const handleRemove = (indexDel) => {
        setTasks(tasks.filter((task, index) => index !== indexDel));
    }

    return (
        <div className="card">
                <h3>{props.title}</h3>
                {tasks.map((task, index) => (
                    <Task title={task} onDelete={() => handleRemove(index)} key={index}/>
                ))}
                <form className="add-task" action="input" onSubmit={handleSubmit}>
                    <input value={add} type="text" placeholder="Add Task" onChange={event => setAdd(event.target.value)}/> 
                    <button className="add-btn">+</button>  
                </form> 
        </div>
    )
}
