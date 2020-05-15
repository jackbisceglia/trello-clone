import React, {useState} from 'react'
import './task.css';

export default function Task(props) {
    const [isStrike, setIsStrike] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [newInput, setNewInput] = useState('')

    const handleUpdate = (e) => {
        e.preventDefault();
        setTitle(newInput)
        setUpdating(!updating)
    }


    return (
        <div className="task">
            {/* Conditionally Render either item title or input box depending on updating state */}
            {updating
                ?
                <form action="input" onSubmit={handleUpdate} className="update-form">
                    <input 
                        onChange={event => setNewInput(event.target.value)}
                        type="text"
                        className="update-task" 
                        placeholder={title}
                    />
                </form>

                :
                <p 
                    onClick={() => setIsStrike(!isStrike)}
                    style={isStrike ? {textDecoration: 'line-through', fontStyle: 'italic'} : {textDecoration: 'none'}}
                    className="title">
                    {title}
                </p>
            }

            {/* Right side buttons */}
            <div className="buttons">
                <button className="edit-task" onClick={() => setUpdating(!updating)}></button>
                <button className="delete" onClick={props.onDelete}>X</button>
            </div>
        </div>
    )
}
