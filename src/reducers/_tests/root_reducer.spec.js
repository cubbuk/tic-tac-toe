import {expect} from "chai";
import rootReducer from "../index";
import gameInitialState from "../game_reducers/game_reducer_initial_state";
import {O, X} from "../game_reducers/game_constants";
import * as gameReducerSelector from "../game_reducers/game_reducer_selector";
import * as gameActions from "../../actions/game_actions";
import * as selectors from "../../selectors/selectors";

describe("root reducer", () => {

  it("not existing action", (done) => {
    const initialState = rootReducer(undefined, {type: "not existing action"});
    expect(initialState.game).to.eql(gameInitialState);
    done();
  });

  it("selectors of global and local state should return same results", (done) => {
    const initialState = rootReducer(undefined, gameActions.play(0, 0));
    const {game} = initialState;
    expect(selectors.getBoard(initialState)).to.eql(gameReducerSelector.getBoard(game));
    expect(selectors.getIsBoardFull(initialState)).to.eql(gameReducerSelector.getIsBoardFull(game));
    done();
  });

  it("play should update state accordingly", (done) => {
    const initialState = rootReducer(undefined, gameActions.play(0, 0));
    expect(selectors.getBoard(initialState)[0][0]).to.eql(O);
    expect(selectors.getCurrentPlayer(initialState)).to.eql(X);
    done();
  });

});