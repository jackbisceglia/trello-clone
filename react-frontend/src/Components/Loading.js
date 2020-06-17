import React from 'react'
import Navbar from './Navbar';

import '../App.css';


export default function Loading() {
    return (
    <>
    <div className="contain" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <h1 style={{color: '#07B4EE', textAlign: 'center', fontWeight: 200, fontSize: '2.5rem', letterSpacing: '0.35rem'}}>LOADING...</h1>
    </div>
    </>
    )
}
