import * as gameActionTypes from "../../action_types/game_action_types";
import initialState, {boardSize} from "./game_reducer_initial_state";
import gameHelpers from "./gama_helpers";

const newFamilyTreeReducer = (state = initialState, action) => {
  switch (action.type) {
    case gameActionTypes.NEW_GAME: {
      return {...initialState};
    }
    case gameActionTypes.PLAY: {
      const newBoard = state.board.map((boardRow, rowIndex) => {
        if (rowIndex === action.rowIndex) {
          return boardRow.map((boardColumn, colIndex) => {
            if (colIndex === action.colIndex) {
              return action.currentPlayer;
            } else {
              return boardColumn;
            }
          });
        } else {
          return boardRow;
        }
      });
      return {
        ...state,
        currentPlayer: action.currentPlayer === "O" ? "X" : "O",
        board: newBoard,
        theWinner: gameHelpers.computeWinner(newBoard, boardSize)
      };
    }
    default:
      return state;
  }
};


export default newFamilyTreeReducer;