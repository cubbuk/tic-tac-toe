import gameHelper from "./game_helper";
export const getBoard = (localState) => localState.board;
export const getCurrentPlayer = (localState) => localState.currentPlayer;
export const getTheWinner = (localState) => localState.theWinner;
export const getWinnerCells = (localState) => localState.winnerCells;
export const getIsBoardFull = (localState) => gameHelper.isBoardFull(localState.board);