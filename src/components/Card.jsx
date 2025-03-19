import "../styles/Card.css"

export default function Card({ content, image, backImage, isFlipped, isMatched, handleCardClick }) {
  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onClick={handleCardClick}
    >
      {isFlipped ? (
        <img src={image} alt={content} />
      ) : (
        <img src={backImage} alt="Back of Card" />
      )}
      
    </div>
  );
}
