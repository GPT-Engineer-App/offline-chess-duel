const GameInfo = ({ currentPlayer, gameStatus }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Game Info</h2>
      <p className="mb-2">
        Current Player: <span className="font-semibold capitalize">{currentPlayer}</span>
      </p>
      <p className="mb-2">
        Game Status: <span className="font-semibold capitalize">{gameStatus}</span>
      </p>
    </div>
  );
};

export default GameInfo;
