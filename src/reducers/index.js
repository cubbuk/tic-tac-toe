import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import gameReducer from "./game_reducers/game_reducer";

const rootReducer = combineReducers({
  routing: routerReducer,
  game: gameReducer
});

export default rootReducer;