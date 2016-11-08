import {expect} from "chai";
import {X, O} from "../game_constants";
import gameHelper from "../game_helper";

describe("itemsOfTheArrayAreSame method", () => {

  it("empty array should return true for having all the items same", (done) => {
    expect(gameHelper.itemsOfTheArrayAreSame([])).to.equal(true);
    done();
  });

  it("array with falsy value should not return true for same items", (done) => {
    expect(gameHelper.itemsOfTheArrayAreSame(["", "", X])).to.equal(false);
    done();
  });

  it("array with same items should return true", (done) => {
    expect(gameHelper.itemsOfTheArrayAreSame([X, X, X])).to.equal(true);
    done();
  });

});

describe("isBoardFull method", () => {

  it("having empty value in an matrix should return false", (done) => {
    let board = [];
    board[0] = ["", X];
    board[1] = [X, X];
    expect(gameHelper.isBoardFull(board)).to.equal(false);
    done();
  });

  it("full board returns true", (done) => {
    let board = [];
    board[0] = ["Y", X];
    board[1] = [X, X];
    expect(gameHelper.isBoardFull(board)).to.equal(true);
    done();
  });

});

describe("createWinnerCell and createWinnerCellsFromRow should return same type of objects", () => {

  it("winner cell with same row value should be assessed as true", (done) => {
    const winnerCell = gameHelper.createWinnerCell(0, 1);
    const winnerCells = gameHelper.createWinnerCellsFromRow([X, X, X], 0);
    gameHelper.isWinnerCell(winnerCells, winnerCell.rowIndex, winnerCell.colIndex);
    expect(gameHelper.isWinnerCell(winnerCells, winnerCell.rowIndex, winnerCell.colIndex)).to.equal(true);
    done();
  });

  it("winner cell with same col value should be assessed as true", (done) => {
    const winnerCell = gameHelper.createWinnerCell(0, 1);
    const winnerCells = gameHelper.createWinnerCellsFromCol([X, X, X], 1);
    gameHelper.isWinnerCell(winnerCells, winnerCell.rowIndex, winnerCell.colIndex);
    expect(gameHelper.isWinnerCell(winnerCells, winnerCell.rowIndex, winnerCell.colIndex)).to.equal(true);
    done();
  });

  it("compute winner cells should return correct cells, col win", (done) => {
    const board = [];
    board[0] = [X, O, X];
    board[1] = [X, O, O];
    board[2] = [X, X, O];
    const winnerCells = gameHelper.computeWinnerCells(board, 3);
    expect(gameHelper.isWinnerCell(winnerCells, 0, 0)).to.equal(true);
    expect(gameHelper.isWinnerCell(winnerCells, 1, 0)).to.equal(true);
    expect(gameHelper.isWinnerCell(winnerCells, 2, 0)).to.equal(true);
    expect(gameHelper.isWinnerCell(winnerCells, 2, 2)).to.equal(false); //2,2 is not part of winner cell
    done();
  });

  it("board to col and diagonal array works correctly", (done) => {
    const board = [];
    board[0] = [X, O, X];
    board[1] = [X, O, O];
    board[2] = [X, X, O];
    const colArray = gameHelper.boardToColArray(board, 1);
    const diagonalArray = gameHelper.boardToDiagonalArray(board);
    expect(colArray).to.eql([O, O, X]); // deep equality not reference equality
    expect(diagonalArray).to.eql([X, O, O]); // deep equality not reference equality
    done();
  });


  it("row win", (done) => {
    const board = [];
    board[0] = [X, X, X];
    board[1] = [X, O, O];
    board[2] = [O, X, O];
    const winnerCells = gameHelper.computeWinnerCells(board, 3);
    expect(gameHelper.isWinnerCell(winnerCells, 0, 0)).to.equal(true);
    expect(gameHelper.isWinnerCell(winnerCells, 0, 1)).to.equal(true);
    expect(gameHelper.isWinnerCell(winnerCells, 0, 2)).to.equal(true);
    expect(gameHelper.isWinnerCell(winnerCells, 2, 2)).to.equal(false); //2,2 is not part of winner cell
    done();
  });

  it("diagonal win", (done) => {
    const board = [];
    board[0] = [X, O, X];
    board[1] = [O, X, O];
    board[2] = [X, O, X];
    const winnerCells = gameHelper.computeWinnerCells(board, 3);
    expect(gameHelper.isWinnerCell(winnerCells, 0, 0)).to.equal(true);
    expect(gameHelper.isWinnerCell(winnerCells, 1, 1)).to.equal(true);
    expect(gameHelper.isWinnerCell(winnerCells, 2, 2)).to.equal(true);
    expect(gameHelper.isWinnerCell(winnerCells, 1, 2)).to.equal(false);
    done();
  });

});