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

    
    
    return (
        <div className="gameboard">
        {shuffledCards.map((card, index) => (
        <Card
         key={`${card.id}-${index}`}
        content={card.content}
        image={card.image}
        backImage={backImage}
        isFlipped={false}
        isMatched={false}
        handleCardClick={() => console.log(`Clicked card ${card.id}`)}
        />
        ))}
        </div>
    );
}