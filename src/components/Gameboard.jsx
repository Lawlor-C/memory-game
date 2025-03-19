import { useState } from "react";
import { cardsArray } from "../data/cardData";
import Card from "./Card";
import "../styles/Gameboard.css"

export default function Gameboard() {
    
    const selectedSet = "test";
    const { cards, backImage } = cardsArray[selectedSet];
    const doubleSelectedSet = [...cards, ...cards];
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
    const shuffledCards = shuffleArray(doubleSelectedSet);
    
    const initialFlipState = shuffledCards.map((card, index) => ({
        index: index,
        isFlipped: false,
    }));
    const [flipState, setFlipState] = useState(initialFlipState);

    const handleCardClick = (index) => {
        console.log(`Clicked card at index ${index}`);
        setFlipState(prevState =>
            prevState.map((card, i) =>
                i === index ? { ...card, isFlipped: !card.isFlipped } : card
            )
        );
    };
    
      

    
    
    return (
        <div className="gameboard">
        {shuffledCards.map((card, index) => (
        <Card
         key={`${card.id}-${index}`}
        content={card.content}
        image={card.image}
        backImage={backImage}
        isFlipped={flipState[index].isFlipped}
        isMatched={false}
        handleCardClick={() => handleCardClick(index)}
        />
        ))}
        </div>
    );
}