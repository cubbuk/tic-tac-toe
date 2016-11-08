import * as gameReducerSelectors from "../reducers/game_reducers/game_reducer_selector";
export const getBoard = (state) => gameReducerSelectors.getBoard(state.game);
export const getCurrentPlayer = (state) => gameReducerSelectors.getCurrentPlayer(state.game);
export const getTheWinner = (state) => gameReducerSelectors.getTheWinner(state.game);
export const getIsBoardFull = (state) => gameReducerSelectors.getIsBoardFull(state.game);
export const getWinnerCells = (state) => gameReducerSelectors.getWinnerCells(state.game);