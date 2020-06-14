import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import './App.css';
import './landing.css';

const modalStyles = {
    content : {
        width                 : '30%',
        height                 : '50%',
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        display : "flex",
        flexDirection : "column",
        alignItems : "center"
      }
}

Modal.setAppElement('#root')

export default function Landing({history}) {

    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <div className="main-container">
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="Example Modal"
                >
                <h1 style={{textAlign: 'center', fontSize: '1.5rem'}}>Sign Up for Trello Clone!</h1>
                <form action="" className="sign-up">
                    <input type="email" placeholder="Email Address"/>
                    <input type="password" placeholder="Password"/>
                    <input type="password" placeholder="Confirm Password"/>
                    <button className="button sign-up-btn">Sign Up!</button>
                </form>
            </Modal>


            <div className="intro">
                <h1 style={{textAlign: 'center', color: 'white', margin: '1rem 0', marginTop: '4rem', fontSize: '2.5rem'}}>Trello Clone</h1>

                <h2 style={{textAlign: 'center', margin: '1rem 0', lineHeight: '1.7rem'}}>Simple.<br/>Organized.<br/>Accessible.</h2>

                <h3 style={{textAlign: 'center', width: '40%', fontWeight: '200', color: 'white', fontSize: '1.25rem', margin: '1rem 0'}}>Task tracking for your everyday needs</h3>
            </div>
            <div className="login">
                <div className="login-box">
                    <h1 className="title1">Login</h1>
                    <form className="login-form" action="" onSubmit={() => {
                        history.push("/home")
                    }}>
                        <input type="email" placeholder="Email address" className="inputBox"/>
                        <input type="password" placeholder="Password" className="inputBox"/>
                        <button className="button">Login</button>
                    </form>
                    <p className="else" onClick={() => {
                        setModalOpen(true)
                    }}>Sign Up Here</p>
                </div>

            </div>
        </div>
    )
}
