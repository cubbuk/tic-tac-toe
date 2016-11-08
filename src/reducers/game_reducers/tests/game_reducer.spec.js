import {expect} from "chai";
import gameHelper from "../game_helper";
import gameReducer from "../game_reducer";
import * as gameReducerSelector from "../game_reducer_selector";
import * as gameActions from "../../../actions/game_actions";
import initialState from "../game_reducer_initial_state";
import {O, X} from "../game_constants";

describe("game reducer", () => {

  it("not existing action", (done) => {
    expect(gameReducer(undefined, {type: "not existing action"})).to.eql(initialState);
    done();
  });

  it("play", (done) => {
    const localState = gameReducer(undefined, gameActions.play(0, 0));
    expect(gameReducerSelector.getIsBoardFull(localState)).to.be.false;
    expect(gameReducerSelector.getTheWinner(localState)).to.be.empty;
    expect(gameReducerSelector.getCurrentPlayer(localState)).to.equal(X);
    expect(gameReducerSelector.getBoard(localState)[0][0]).to.equal(O);

    const newState = gameReducer(localState, gameActions.play(0, 0));
    expect(gameReducerSelector.getCurrentPlayer(newState)).to.equal(O);
    expect(gameReducerSelector.getBoard(newState)[0][0]).to.equal(X);
    done();
  });

  it("play after new game should initialize state", (done) => {
    const localState = gameReducer(undefined, gameActions.play(0, 0));
    expect(gameReducerSelector.getCurrentPlayer(localState)).to.equal(X);

    const newState = gameReducer(localState, gameActions.startNewGame());
    expect(newState).to.eql(initialState);
    done();
  });

  it("play to win row with O", (done) => {
    let localState = gameReducer(undefined, gameActions.play(0, 0)); //O
    localState = gameReducer(localState, gameActions.play(1, 0)); //X
    localState = gameReducer(localState, gameActions.play(0, 1)); // OO
    localState = gameReducer(localState, gameActions.play(1, 1)); // XX
    localState = gameReducer(localState, gameActions.play(0, 2)); // OOO win
    expect(gameReducerSelector.getTheWinner(localState)).to.equal(O);
    expect(gameReducerSelector.getWinnerCells(localState)).to.eql([gameHelper.createWinnerCell(0, 0), gameHelper.createWinnerCell(0, 1), gameHelper.createWinnerCell(0, 2)]);
    done();
  });

  it("play to win col with X", (done) => {
    let localState = gameReducer(undefined, gameActions.play(0, 0)); //O
    localState = gameReducer(localState, gameActions.play(1, 0)); //X
    localState = gameReducer(localState, gameActions.play(0, 1)); // OO
    localState = gameReducer(localState, gameActions.play(1, 1)); // XX
    localState = gameReducer(localState, gameActions.play(2, 2)); // O
    localState = gameReducer(localState, gameActions.play(1, 2)); // XXX win
    expect(gameReducerSelector.getTheWinner(localState)).to.equal(X);
    expect(gameReducerSelector.getWinnerCells(localState)).to.eql([gameHelper.createWinnerCell(1, 0), gameHelper.createWinnerCell(1, 1), gameHelper.createWinnerCell(1, 2)]);
    done();
  });

  it("play to win diagonal with X", (done) => {
    let localState = gameReducer(undefined, gameActions.play(0, 1)); //O
    localState = gameReducer(localState, gameActions.play(0, 0)); //X
    localState = gameReducer(localState, gameActions.play(1, 0)); // OO
    localState = gameReducer(localState, gameActions.play(1, 1)); // XX
    localState = gameReducer(localState, gameActions.play(2, 1)); // O
    localState = gameReducer(localState, gameActions.play(2, 2)); // XXX win
    expect(gameReducerSelector.getTheWinner(localState)).to.equal(X);
    const expectedWinnerCells = [gameHelper.createWinnerCell(0, 0), gameHelper.createWinnerCell(1, 1), gameHelper.createWinnerCell(2, 2)];
    expect(gameReducerSelector.getWinnerCells(localState)).to.eql(expectedWinnerCells);
    done();
  });

  it("play to draw", (done) => {
    let localState = gameReducer(undefined, gameActions.play(0, 0)); //O
    localState = gameReducer(localState, gameActions.play(0, 1)); //OX
    localState = gameReducer(localState, gameActions.play(0, 2)); // OXO
    localState = gameReducer(localState, gameActions.play(1, 1)); // _X_
    localState = gameReducer(localState, gameActions.play(1, 0)); // XO
    localState = gameReducer(localState, gameActions.play(1, 2)); // XOX
    localState = gameReducer(localState, gameActions.play(2, 1)); // _O_
    localState = gameReducer(localState, gameActions.play(2, 0)); // XO_
    localState = gameReducer(localState, gameActions.play(2, 2)); // XOO
    expect(gameReducerSelector.getTheWinner(localState)).to.be.empty;
    expect(gameReducerSelector.getWinnerCells(localState)).to.be.empty;
    expect(gameReducerSelector.getIsBoardFull(localState)).to.true;
    done();
  });

});