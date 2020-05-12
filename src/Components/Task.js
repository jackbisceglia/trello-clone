import React from 'react'
import './task.css';

export default function Task(props) {
    return (
        <div className="task">
            <p className="title">{props.title}</p>
        </div>
    )
}
