import React, { useState, useContext} from 'react';
import './nav.css';

import { UserContext } from '../userContext';
import { AuthContext } from '../authContext';



export default function Navbar() {
    const {userId, setUserId} = useContext(UserContext);
    const {authed, setAuthed} = useContext(AuthContext);

    const handleLogout = () => {
        setUserId(null);
        setAuthed(false);

        fetch('/signout', {
            method : 'DELETE'
        });
    }

    return (
        <div className="bar">
            <h1>Trello-Clone</h1>
            <button 
                className="signout"
                onClick={() => {
                    handleLogout();
                }}
                >Sign Out
        </button>
        </div>
    )
}