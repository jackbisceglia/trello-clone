import React, {useState} from 'react';
import './App.css';
import './Components/card.css';
import Navbar from './Components/Navbar';
import Card from './Components/Card';

function App() {
  const [cards, setCards] = useState(['Start Your First Card']);

  const handleRemove = (removeCard) => {
    setCards(cards.filter(currCard => currCard !== removeCard));
}


  return (
    <>
    <Navbar /> 
    <div className="contain">
      {cards.map(currCard => (
        <Card title={currCard} key={currCard} needsTitle={false} onDelete={() => handleRemove(currCard)}/>
      ))}
      <button
        className="new-list"
        onClick={() => setCards([...cards, `Card ${cards.length + 1}`])}
        >New Task
      </button>
    </div>
    </>
  );
}

export default App;
