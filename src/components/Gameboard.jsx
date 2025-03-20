import { useState } from "react";
import 'animate.css';
import { cardsArray } from "../data/cardData";
import Card from "./Card";
import "../styles/Gameboard.css";

//whole Gameboard - will streamline into utils once all functioning correctly
export default function Gameboard() {
  const selectedSet = "test"; //Hardcoding this as test for now
  const { cards, backImage } = cardsArray[selectedSet];

  //Need to duplicate the cards so can be paired (trial and error with uniqueness)
  const doubleSelectedSet = [...cards, ...cards].map((card, index) => ({
    ...card,
    uniqueId: `${card.id}-${index}`,
  }));
  //Randomise the double-deck (but create them only once)
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  const [shuffledCards] = useState(() => shuffleArray(doubleSelectedSet));

  //Render the cards, unflipped (ie face-down)
  const initialFlipState = shuffledCards.map((card) => ({
    uniqueId: card.uniqueId,
    isFlipped: false,
  }));
  const [flippedCards, setFlippedCards] = useState([]);
  const [flipState, setFlipState] = useState(initialFlipState);

  //Flip card when clicked (should not affect other cards - updated to put clicked cards into a new array, max 2)
  const handleCardClick = (uniqueId) => {
    console.log(`Clicked card with ID ${uniqueId}`);
    setFlippedCards((prev) => {
        if (prev.length < 2) {
            return [...prev, uniqueId];        
        }
        return prev;
    });

    setFlipState((prevState) =>
      prevState.map((card) =>
        card.uniqueId === uniqueId
          ? { ...card, isFlipped: !card.isFlipped }
          : card
      )
    );
  };

  return (
    <div className="gameboard">
      {shuffledCards.map((card) => {
        const flippedState = flipState.find((state) => state.uniqueId === card.uniqueId);
  
        return (
          <Card
            key={card.uniqueId} 
            content={card.content}
            image={card.image}
            backImage={backImage}
            isFlipped={flippedState.isFlipped}
            isMatched={false}
            handleCardClick={() => handleCardClick(card.uniqueId)}
          />
        );
      })}
    </div>
  );
  
}
