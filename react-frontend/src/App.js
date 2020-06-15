import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import { UserContext } from './userContext'

import './App.css';
import './Components/card.css';
import Trello from './Trello';
import Landing from './Landing';

function App( {history} ) {
  const [userId, setUserId] = useState("Default Value");

  return (
    <UserContext.Provider value={{userId, setUserId}}>
    <BrowserRouter>
      <Switch>
          <Route path="/" exact component={Landing}/>
          <ProtectedRoute path="/home" component={Trello}/>
      </Switch>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;