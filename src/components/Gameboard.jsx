import { useState } from "react";
import { useEffect } from "react";
import 'animate.css';
import { cardsArray } from "../data/cardData";
import Card from "./Card";
import "../styles/Gameboard.css";



//whole Gameboard - will streamline into utils once all functioning correctly
export default function Gameboard() {
  const selectedSet = "hearts"; //Hardcoding this as test for now
  const { cards, backImage } = cardsArray[selectedSet];



  //Need to duplicate the cards so can be paired (trial and error with uniqueness)
  const doubleSelectedSet = [...cards, ...cards].map((card, index) => ({
    ...card,
    uniqueId: `${selectedSet}-${card.id}-${index}`,
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



  //Interact with cards via click...
  const handleCardClick = (uniqueId) => {
    //...but not if already matched...
    const clickedMatched = flipState.find(card => card.uniqueId === uniqueId);
    if (clickedMatched.isMatched) {
        console.log("Card Already Matched");
        return;
    }
    //...and also not the card just clicked
    if (flippedCards.includes(uniqueId)) {
        console.log("Card Already Flipped");
        return;
    }

    console.log(`Clicked card with ID ${uniqueId}`);

    //Add clicked cards (max 2) into temp array to prepare to check for match
    setFlippedCards((prev) => {
        if (prev.length < 2) {
            return [...prev, uniqueId];        
        }
        return prev;
    });


    //Renders the flipped version of the card for user to see
    setFlipState((prevState) =>
      prevState.map((card) =>
        card.uniqueId === uniqueId
          ? { ...card, isFlipped: !card.isFlipped }
          : card
      )
    );
  };

  //Effect to kick in once the temp array holds two cards, compare content for match
  useEffect(() => {
    if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;
        const firstCardContent = shuffledCards.find(card => card.uniqueId === firstCard).content;
        const secondCardContent = shuffledCards.find(card => card.uniqueId === secondCard).content;

        if (firstCardContent === secondCardContent) {
            console.log("It's a Match!");
            setFlipState((prevState) =>
            prevState.map((card) =>
            flippedCards.includes(card.uniqueId)
        ? {...card, isMatched: true}
        : card
        )
    );
        } else {
            console.log("Not a Match!");
            setTimeout(() => {
                setFlipState((prevState) =>
                prevState.map((card) =>
                flippedCards.includes(card.uniqueId)
            ? {...card, isFlipped: false}
            : card
        )
    );
            }, 1000);
        }
        setFlippedCards([]);
    }
  }, [flippedCards, shuffledCards]);



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
