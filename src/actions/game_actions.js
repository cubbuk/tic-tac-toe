import * as gameActionTypes from "../action_types/game_action_types";

export const startNewGame = () => {
  return {type: gameActionTypes.NEW_GAME};
};
export const play = (rowIndex, colIndex) => {
  return {type: gameActionTypes.PLAY, rowIndex, colIndex};
};