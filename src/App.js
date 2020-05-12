import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Card from './Components/Card';

function App() {
  return (
    <>
    <Navbar />
    <div className="contain">
      <Card title={"Clean Room"}/>
      <Card title={"Do the Dishes"}/>
      <Card title={"Go on Jog"}/>
    </div>
    </>
  );
}

export default App;
