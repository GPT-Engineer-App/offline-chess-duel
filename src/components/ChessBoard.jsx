import { useState } from 'react';
import { initialChessBoard, isValidMove } from '../utils/chessUtils';
import ChessPiece from './ChessPiece';

const ChessBoard = ({ currentPlayer, onTurn, onGameEnd }) => {
  const [board, setBoard] = useState(initialChessBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);

  const handleSquareClick = (row, col) => {
    if (selectedPiece) {
      if (isValidMove(board, selectedPiece, { row, col }, currentPlayer)) {
        const newBoard = [...board];
        newBoard[row][col] = newBoard[selectedPiece.row][selectedPiece.col];
        newBoard[selectedPiece.row][selectedPiece.col] = null;
        setBoard(newBoard);
        setSelectedPiece(null);
        onTurn();
      } else {
        // Invalid move, deselect the piece
        setSelectedPiece(null);
      }
    } else if (board[row][col] && board[row][col].color === currentPlayer) {
      setSelectedPiece({ row, col });
    }
  };

  return (
    <div className="grid grid-cols-8 gap-0 w-96 h-96 border-4 border-gray-800">
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-12 h-12 flex items-center justify-center ${
              (rowIndex + colIndex) % 2 === 0 ? 'bg-gray-200' : 'bg-gray-400'
            } ${selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex ? 'bg-yellow-200' : ''}`}
            onClick={() => handleSquareClick(rowIndex, colIndex)}
          >
            {piece && <ChessPiece piece={piece} />}
          </div>
        ))
      )}
    </div>
  );
};

export default ChessBoard;
