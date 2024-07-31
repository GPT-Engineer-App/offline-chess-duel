const ChessPiece = ({ piece }) => {
  const pieceSymbols = {
    king: '♔',
    queen: '♕',
    rook: '♖',
    bishop: '♗',
    knight: '♘',
    pawn: '♙',
  };

  return (
    <span className={`text-4xl ${piece.color === 'white' ? 'text-white' : 'text-black'}`}>
      {pieceSymbols[piece.type]}
    </span>
  );
};

export default ChessPiece;
