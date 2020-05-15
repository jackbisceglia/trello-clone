import React, {useState} from 'react';
import './App.css';
import './Components/card.css';
import Navbar from './Components/Navbar';
import Card from './Components/Card';

function App() {
  const [cards, setCards] = useState(['Make First Card']);

  const handleCardRemove = (indexDel) => {
    setCards(cards.filter((task, index) => index !== indexDel));
  }

  return (
    <>
    <Navbar />
    <div className="contain">
      {cards.map((card, index) => (
        <Card title={card} key={index} needsTitle={true} handleRemove={() => handleCardRemove(index)}/>
      ))}
      <button
        className="new-list"
        onClick={() => setCards([...cards, 'New Card'])}
        >New Task
      </button>
    </div>
    </>
  );
}

export default App;
