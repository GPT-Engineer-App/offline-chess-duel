export const initialChessBoard = [
  [
    { type: 'rook', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'queen', color: 'black' },
    { type: 'king', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'rook', color: 'black' },
  ],
  Array(8).fill({ type: 'pawn', color: 'black' }),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill({ type: 'pawn', color: 'white' }),
  [
    { type: 'rook', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'queen', color: 'white' },
    { type: 'king', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'rook', color: 'white' },
  ],
];

export const isValidMove = (board, from, to, currentPlayer) => {
  const piece = board[from.row][from.col];
  if (!piece || piece.color !== currentPlayer) return false;

  switch (piece.type) {
    case 'pawn':
      return isValidPawnMove(board, from, to, currentPlayer);
    // Add cases for other piece types here
    default:
      return false;
  }
};

const isValidPawnMove = (board, from, to, currentPlayer) => {
  const direction = currentPlayer === 'white' ? -1 : 1;
  const startRow = currentPlayer === 'white' ? 6 : 1;

  // Move forward one square
  if (from.col === to.col && to.row === from.row + direction && !board[to.row][to.col]) {
    return true;
  }

  // Move forward two squares from starting position
  if (from.col === to.col && from.row === startRow && to.row === from.row + 2 * direction &&
      !board[from.row + direction][from.col] && !board[to.row][to.col]) {
    return true;
  }

  // Capture diagonally
  if (Math.abs(from.col - to.col) === 1 && to.row === from.row + direction &&
      board[to.row][to.col] && board[to.row][to.col].color !== currentPlayer) {
    return true;
  }

  return false;
};
