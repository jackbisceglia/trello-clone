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
    // Sign Up Hooks
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPass, setSignUpPass] = useState('');
    const [signUpPassConf, setSignUpPassConf] = useState('');

    // Login Hooks
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPass, setLoginPass] = useState('');

    // Modal State
    const [modalOpen, setModalOpen] = useState(false);

    const [loginFailed, setLoginFailed] = useState(false);

    const closeModal = () => {
        setModalOpen(false)
    }

    const handleSignUp = (e) => {
        fetch(`/signup`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email : signUpEmail,
                pass : signUpPass,
                passConfirm : signUpPassConf
            })
          }).then(res => res.json())
          .then(data => {
              if (data.success){
                history.push("/")
              }
          });
    }
    
    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`/login`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email : loginEmail,
                pass : loginPass
            })
          }).then(res => res.json())
          .then(data => {
              console.log(data);
              if (data.success){
                history.push("/home")
              }
              else{
                  setLoginFailed(true)
              }
          });
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
                <form action="" className="sign-up" onSubmit={(event) => handleSignUp(event)}>
                    <input type="email" placeholder="Email Address" onChange={event => setSignUpEmail(event.target.value)}/>
                    <input type="password" placeholder="Password" onChange={event => setSignUpPass(event.target.value)}/>
                    <input type="password" placeholder="Confirm Password" onChange={event => setSignUpPassConf(event.target.value)}/>
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

                    <form className="login-form" action="" onSubmit={(event) => handleLogin(event)}>
                        <input type="email" placeholder="Email address" className="inputBox" onChange={event => setLoginEmail(event.target.value)}/>
                        <input type="password" placeholder="Password" className="inputBox" onChange={event => setLoginPass(event.target.value)}/>
                        <button className="button">Login</button>
                    </form>

                    <p style={loginFailed ? {color: 'red', margin: '0', fontSize: '.7rem'} : {display: 'none'}}>Email or password incorrect</p>

                    <p className="else" onClick={() => {
                        setModalOpen(true)
                    }}>Sign Up Here</p>
                </div>

            </div>
        </div>
    )
}
