import React, { useState, useContext} from 'react';
import './nav.css';

import { UserContext } from '../userContext';
import { AuthContext } from '../authContext';



export default function Navbar( {history} ) {
    const {userId, setUserId} = useContext(UserContext);
    const {authed, setAuthed} = useContext(AuthContext);

    const handleLogout = () => {
        fetch('https://68.183.117.91.trellobackend.ga/signout', {
            method : 'DELETE',
            credentials: 'include'
        });

        setUserId(null);
        setAuthed(false);
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