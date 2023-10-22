/* eslint-disable react/prop-types */
import "../css/tictactoe.css"

const Square = ({ value, onSquareClick, isWinningSquare }) => {
  const squareClasses = isWinningSquare ? "square highlight" : "square";
  return (
    <button className={squareClasses} onClick={onSquareClick}>{value}</button>
  );
};

export default Square;