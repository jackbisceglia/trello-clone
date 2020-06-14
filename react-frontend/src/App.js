import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import './App.css';
import './Components/card.css';
import Navbar from './Components/Navbar';
import Card from './Components/Card';
import Trello from './Trello';
import Landing from './Landing';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing}/>
        <Route path="/home" exact component={Trello}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;