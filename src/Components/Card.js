import React from 'react';
import './card.css';
import Task from './Task';


export default function Card(props) {
    return (
        <div className="card">
                <h3>{props.title}</h3>
                <Task title={"Make Bed"}/>
                <Task title={"Paint Walls"}/>
                <Task title={"Vacuum"}/>
                <form className="add-task" action="input">
                    <input type="text" placeholder="Add Task"/> 
                    <button className="add-btn">+</button>  
                </form> 
        </div>
    )
}
