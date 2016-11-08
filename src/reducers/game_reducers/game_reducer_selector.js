export const getBoard = (localState) => localState.board;
export const getCurrentPlayer = (localState) => localState.currentPlayer;
export const getTheWinner = (localState) => localState.theWinner;
export const getWinnerCells = (localState) => localState.winnerCells;
export const getIsBoardFull = (localState) => {
  let {board} = localState;
  let isBoardFull = true;
  board.map(boardRow => {
    boardRow.map(boardCell => {
      isBoardFull = isBoardFull && !!boardCell;
    })
  });
  return isBoardFull;
};