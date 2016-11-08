const BOARD_SIZE = 3;
const board = [BOARD_SIZE];
for (let i = 0; i < BOARD_SIZE; i++) {
  board[i] = [];
  for (let j = 0; j < BOARD_SIZE; j++) {
    board[i][j] = "";
  }
}
export default {
  board,
  currentPlayer: "0"
}