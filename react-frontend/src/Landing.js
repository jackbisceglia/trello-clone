// Packages
import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';

// Context API
import { UserContext } from './userContext';
import { AuthContext } from './authContext';

// CSS Imports
import './App.css';
import './landing.css';

const modalStyles = {
    content : {
        width                 : '30%',
        height                 : '55%',
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

const isLetter = (character) => {
    return character.toUpperCase() !== character.toLowerCase();
}

const isNumber = (character) => {
    if (character >= '0' && character <= '9') {
        return true;
    }
    else {
        return  false;
    }
}

const isCap = (character) => {
    if (!isLetter(character)){
        return false;
    }
    else{
        if (character.toUpperCase() === character){
            return true
        }
        else {
            return false
        }
    }
}

const isValidPass = (currPass) => {
    let hasNumber = false;
    let hasCapLetter = false;
    let isLongEnough = false;

    if (currPass.length >= 5) {
        isLongEnough = true;
    }

    for (let i = 0; i < currPass.length; i++) {
        if (isCap(currPass.charAt(i))){
            hasCapLetter = true;
        }
        else if (isNumber(currPass.charAt(i))){
            hasNumber = true;
        }

        if (hasNumber && hasCapLetter && isLongEnough){
            return true;
        }
    }

    return false;
}


export default function Landing({ history }) {
    // Sign Up Hooks
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPass, setSignUpPass] = useState('');
    const [signUpPassConf, setSignUpPassConf] = useState('');

    // Login Hooks
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPass, setLoginPass] = useState('');

    // Modal State
    const [modalOpen, setModalOpen] = useState(false);

    // Auth for UI
    const [signUpSent, setSignUpSent] = useState(false);
    const [accountMade,  setAccountMade] = useState(false); 
    const [passesMatchFrontend, setPassesMatchFrontend] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const [validPass, setValidPass] = useState(false);
    const [errorMsgSignup, setErrorMsgSignup] = useState('');    


    const {userId, setUserId} = useContext(UserContext);
    const {authed, setAuthed} = useContext(AuthContext);

    const closeModal = () => {
        // RESET ALL SIGN UP FIELDS UPON CLOSE
        setModalOpen(false);
        setAccountMade(false);
        setSignUpSent(false);

        setPassesMatchFrontend(false);
        setValidPass(false);
        setErrorMsgSignup('');

        setSignUpPass('');
        setSignUpPassConf('');
    }

    useEffect(() => {
        if(authed){
            history.push('/home');
        }
    }
    ,[]);

    const handleSignUp = (e) => {
        e.preventDefault();
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
          })
          .then(res => res.json())
          .then(data => {
            setSignUpSent(true);
            if (data.success){
                setAccountMade(true);
            }
            else {
                setAccountMade(false);
                setErrorMsgSignup(data.error);
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
              if (data.success){
                setAuthed(true);
                setUserId(data.userid);
                localStorage.setItem('rememberMe', true);
                localStorage.setItem('userId', data.userid)
                
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
                    <input 
                        type="password"
                        placeholder="Password"
                        style={validPass ? {borderBottom: '1px solid green'} : {borderBottom: '1px solid red'}}
                        onChange={event => {
                            setSignUpPass(event.target.value);
                            isValidPass(event.target.value) ? setValidPass(true) : setValidPass(false);
                        }}/>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        style={passesMatchFrontend ? {borderBottom: '1px solid green'} : {borderBottom: '1px solid red'}} 
                        onChange={event => {
                            setSignUpPassConf(event.target.value);

                            if(event.target.value === signUpPass){
                                setPassesMatchFrontend(true);
                            }
                            else {
                                setPassesMatchFrontend(false);
                            }
                        }
                    }/>
                    <p style={{fontSize: '.675rem', marginTop: '0'}}>Password must contain one uppercase letter and a number</p>
                    <button className="button sign-up-btn">Sign Up!</button>
                </form>

                {signUpSent && !accountMade
                    ?
                    <p style={{color: 'red', margin: '.25rem 0'}}>{errorMsgSignup}</p>
                    :
                    <div style={{display: 'none'}}></div>
                }
                {signUpSent && accountMade
                    ?
                    <p style={{color: 'green', margin: '0'}}>You're signed up! Login Now</p>
                    :
                    <div style={{display: 'none'}}></div>
                }
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
