/* eslint-disable no-unused-vars */
import { useState } from "react";
import Board from "./Board";


const Game = () => {
  const [history, setHistory] = useState([{squares: Array(9).fill(null), location: null}]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares, location) {
    // const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, location },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    console.log(location);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  
  function changeOrder() {
    setIsAscending(!isAscending);
  }

  const moves = history.map((step, move) => {
    const location = step.location;
    let description;
    if (move > 0) {
      description = 'Go to move #' + move + (location ? `(r${location.row}, c${location.col})` : '');
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        {
          move === currentMove? 
            <div>You are at #{move} {location ? `(r${location.row}, c${location.col})` : ''}</div>
          :
            <button onClick={() => jumpTo(move)}>{description}</button>
        }
        
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      <div className="game-history">
        <button onClick={changeOrder}>
          {
            isAscending ? "Descending" : 'Ascending'
          }
        </button>
        <ol>
          {isAscending? moves : moves.reverse()}
        </ol>
      </div>
    </div>
  );
};

export default Game;