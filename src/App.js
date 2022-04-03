import React, { useEffect, useState } from 'react'
import './App.css';
import Card from './Card';

const cardImages = [
  {"src":"/img/bird.jpg"},
  {"src":"/img/bugs.jpg"},
  {"src":"/img/cart.jpg"},
  {"src":"/img/dora.png"},
  {"src":"/img/doremon.jpg"},
  {"src":"/img/Mickey-Mouse.jpg"},
  {"src":"/img/monkey.jpg"},
  {"src":"/img/squd.png"}
] 


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [matched_cards, setMatched_cards] = useState([])
  const [modal, showModal] = useState(false)

  const shuffleCard = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - .5)
      .map((card) => ({...card, id: Math.random()}))

      setCards(shuffledCards)
      setTurns(0)
      setMatched_cards([])
      setChoiceOne(null)
      setChoiceTwo(null)
      showModal(false)
  }


  const does_cardmatch = () => {
    if(choiceTwo ) {
      if(choiceOne.src === choiceTwo.src) {
        setMatched_cards([...matched_cards, choiceOne.src])
        setChoiceOne(null)
        setChoiceTwo(null)
      }
  }
}
  const handleChoice = (card) => {
    if(!choiceOne) {
      setChoiceOne(card)
      setTurns(turns + 1)
    } else if(!choiceTwo) {
      setTurns(turns + 1)
      setChoiceTwo(card)
    } else {
      setTurns(turns + 1)
      setChoiceOne(card)
      setChoiceTwo(null)
    }   
  }
   
  const handleClick = e => {
    showModal(false)
    shuffleCard()
  }
  useEffect(() => {
     shuffleCard()
  },[])

  useEffect(() => {
    does_cardmatch()
  },[choiceTwo])
  
  useEffect(() => {
      if(matched_cards.length == 8) {
        showModal(true)
      }
  },[matched_cards])

  return (
    <div className="App">
      <h3 className='header'>Memory-Matching Game</h3>
      <p>Total moves - {turns}</p>
        <div className='card-grid'>
          {
            cards.map(card => <Card key={card.id} card={card} handleChoice={handleChoice} choiceOne={choiceOne} choiceTwo={choiceTwo} matched={matched_cards}/>)
          }
        </div>
        <button onClick={shuffleCard}>Shuffle</button>
        <div className={`game-finished ${modal?'add':''}`}>
           <button onClick={handleClick}>X</button>
           <p>Yayy!! Game finished</p>
           <p>Total moves - {turns}</p>
        </div>
    </div>
  );
}

export default App;
