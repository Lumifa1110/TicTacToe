/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import Square from "./Square";

const Board = ({ xIsNext, squares, onPlay }) => {
  const winner = calculateWinner(squares);

  function handleClick(i, location) {
    
    if (squares[i] || calculateWinner(squares).winner) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares, location);
  }
  const board = [];
  for (let row=1; row<4; row++) {
    const board_row = [];
    for (let col=1 ; col<4; col++) {
      const squareIndex = row * 3 + col;
      const isWinningSquare = winner.line.includes(squareIndex);
      board_row.push(
        <Square 
          value={squares[squareIndex]} 
          onSquareClick={() => handleClick(squareIndex, {row, col})}
          isWinningSquare={ isWinningSquare } 
        />
      );
    }
    board.push(
      <div className="board-row">
        {board_row}
      </div>
    );
  }

  let status;
  if (winner.winner) {
    status = 'Winner: ' + winner.winner;
  } else if (squares.every((square) => square)) {
    status = 'It\'s a draw!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      {board}
    </>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}

export default Board;