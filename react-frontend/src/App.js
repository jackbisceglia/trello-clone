// Packages
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Loading from './Components/Loading.js'

// Protected Route for Auth
import ProtectedRoute from './ProtectedRoute.js';

// Context API
import { UserContext } from './userContext';
import { AuthContext } from './authContext';

// Page Components
import Trello from './Trello';
import Landing from './Landing';

// CSS Imports
import './App.css';
import './Components/card.css';

function App( {history} ) {
  const [userId, setUserId] = useState("Default Value");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const loggedIn = localStorage.getItem('rememberMe') === 'true';
      if (loggedIn){
        setUserId(localStorage.getItem('userId'));
        setAuthed(true);
      }    

      setLoading(false);
    },
    []);

  
  return (loading 
    ?
      <Loading />
    :
      <AuthContext.Provider value={{authed, setAuthed}}>
      <UserContext.Provider value={{userId, setUserId}}>
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Landing}/>
            <ProtectedRoute component={Trello}/>
        </Switch>
      </BrowserRouter>
      </UserContext.Provider>
      </AuthContext.Provider>
  );
}

export default App;