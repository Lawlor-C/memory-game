import "../styles/Card.css"

export default function Card({ content, image, backImage, backColor, isFlipped, isMatched, handleCardClick }) {
  return (
    <div
  className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
  onClick={handleCardClick}
  style={{
    backgroundColor: !isFlipped ? backColor : "#99CCFF", 
  }}
>
  {isFlipped ? (
    <img src={image} alt={content} />
  ) : (
    <img src={backImage} alt="Back of Card" />
  )}
</div>
  );
}

