import * as gameActionTypes from "../../action_types/game_action_types";
import initialState from "./game_reducer_initial_state";
import gameHelpers from "./game_helper";
import {X, O, BOARD_SIZE} from "./game_constants";

const newFamilyTreeReducer = (state = initialState, action) => {
  switch (action.type) {
    case gameActionTypes.NEW_GAME: {
      return {...initialState};
    }
    case gameActionTypes.PLAY: {
      let {currentPlayer} = state;
      const newBoard = state.board.map((boardRow, rowIndex) => {
        if (rowIndex === action.rowIndex) {
          return boardRow.map((boardColumn, colIndex) => {
            if (colIndex === action.colIndex) {
              return currentPlayer;
            } else {
              return boardColumn;
            }
          });
        } else {
          return boardRow;
        }
      });
      const winnerCells = gameHelpers.computeWinnerCells(newBoard, BOARD_SIZE);
      return {
        ...state,
        currentPlayer: currentPlayer === O ? X : O,
        board: newBoard,
        winnerCells: winnerCells,
        theWinner: winnerCells.length > 0 ? currentPlayer : ""
      };
    }
    default:
      return state;
  }
};


export default newFamilyTreeReducer;