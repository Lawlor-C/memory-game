import { useState } from "react";
import { cardsArray } from "../data/cardData";
import Card from "./Card";
import "../styles/Gameboard.css"

export default function Gameboard() {
    const selectedSet = "test";
    const { cards, backImage } = cardsArray[selectedSet];
    
    return (
        <div className="gameboard">
        {cards.map((card) => (
        <Card
        key={card.id}
        content={card.content}
        image={card.image}
        backImage={backImage}
        isFlipped={false}
        handleCardClick={() => console.log(`Clicked card ${card.id}`)}
        />
        ))}
        </div>
    );
}