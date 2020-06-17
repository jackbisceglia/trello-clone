// Packages
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie';
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
  const [cookies, setCookie] = useCookies(['']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/active')
    .then(res => res.json())
    .then(data => {
      if (data.sessionActive){
        console.log(data.sessionActive);
        setAuthed(true);
        setUserId(data.userId);
        setLoading(false);
      }
      else{
        setLoading(false);
      }
    })
}
,[]);

  
  return (loading 
    ?
      <Loading />
    :
      <CookiesProvider>
      <AuthContext.Provider value={{authed, setAuthed}}>
      <UserContext.Provider value={{userId, setUserId}}>
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Landing}/>
            <ProtectedRoute path="/home" exact component={Trello}/>
        </Switch>
      </BrowserRouter>
      </UserContext.Provider>
      </AuthContext.Provider>
      </CookiesProvider>
  );
}

export default App;