import React from 'react'

function Card({card, handleChoice, choiceOne, choiceTwo, matched}) {

  const handleClick = e => {
     handleChoice(card)
  }
  return (
    <div className='card'>
        {
            (choiceOne === card || choiceTwo === card || matched.includes(card.src)) ? <img className='front-img' src={card.src}/> : <img className='back-img' onClick={handleClick} src="/img/cover.jpg"/>
        }
        
    </div>
  )
}

export default Card