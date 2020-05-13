import React, {useState} from 'react'
import './task.css';

export default function Task(props) {
    const [isStrike, setIsStrike] = useState(false);
    let title = props.title;


    return (
        <div className="task">
            <p 
                onClick={() => setIsStrike(!isStrike)}
                style={isStrike ? {textDecoration: 'line-through', fontStyle: 'italic'} : {textDecoration: 'none'}}
                className="title">
                {title}
            </p>
            <div className="buttons">
                <button className="edit-task"></button>
                <button className="delete">X</button>
            </div>
        </div>
    )
}
