import { useState } from 'react';
import ChessBoard from '../components/ChessBoard';
import GameInfo from '../components/GameInfo';

const Index = () => {
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [gameStatus, setGameStatus] = useState('ongoing');

  const handleTurn = () => {
    setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
  };

  const handleGameEnd = (status) => {
    setGameStatus(status);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">Two-Player Chess</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <ChessBoard currentPlayer={currentPlayer} onTurn={handleTurn} onGameEnd={handleGameEnd} />
        <GameInfo currentPlayer={currentPlayer} gameStatus={gameStatus} />
      </div>
    </div>
  );
};

export default Index;
