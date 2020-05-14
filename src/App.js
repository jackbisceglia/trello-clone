import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Card from './Components/Card';

function App() {
  return (
    <>
    <Navbar />
    <div className="contain">
      <Card title={"ToDo"}/>
      <h1>Hi</h1>
    </div>
    </>
  );
}

export default App;
