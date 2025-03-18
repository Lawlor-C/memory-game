export default function Card({ content, isFlipped, handleCardClick }) {
  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onClick={handleCardClick}
    >
      {isFlipped ? content : "Back"}
    </div>
  );
}
