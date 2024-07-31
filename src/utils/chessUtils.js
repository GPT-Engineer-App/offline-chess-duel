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
    case 'rook':
      return isValidRookMove(board, from, to);
    case 'knight':
      return isValidKnightMove(from, to);
    case 'bishop':
      return isValidBishopMove(board, from, to);
    case 'queen':
      return isValidQueenMove(board, from, to);
    case 'king':
      return isValidKingMove(from, to);
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

const isValidRookMove = (board, from, to) => {
  if (from.row !== to.row && from.col !== to.col) return false;
  
  const rowStep = from.row === to.row ? 0 : (to.row > from.row ? 1 : -1);
  const colStep = from.col === to.col ? 0 : (to.col > from.col ? 1 : -1);
  
  let currentRow = from.row + rowStep;
  let currentCol = from.col + colStep;
  
  while (currentRow !== to.row || currentCol !== to.col) {
    if (board[currentRow][currentCol]) return false;
    currentRow += rowStep;
    currentCol += colStep;
  }
  
  return true;
};

const isValidKnightMove = (from, to) => {
  const rowDiff = Math.abs(to.row - from.row);
  const colDiff = Math.abs(to.col - from.col);
  return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
};

const isValidBishopMove = (board, from, to) => {
  if (Math.abs(to.row - from.row) !== Math.abs(to.col - from.col)) return false;
  
  const rowStep = to.row > from.row ? 1 : -1;
  const colStep = to.col > from.col ? 1 : -1;
  
  let currentRow = from.row + rowStep;
  let currentCol = from.col + colStep;
  
  while (currentRow !== to.row && currentCol !== to.col) {
    if (board[currentRow][currentCol]) return false;
    currentRow += rowStep;
    currentCol += colStep;
  }
  
  return true;
};

const isValidQueenMove = (board, from, to) => {
  return isValidRookMove(board, from, to) || isValidBishopMove(board, from, to);
};

const isValidKingMove = (from, to) => {
  const rowDiff = Math.abs(to.row - from.row);
  const colDiff = Math.abs(to.col - from.col);
  return rowDiff <= 1 && colDiff <= 1;
};
