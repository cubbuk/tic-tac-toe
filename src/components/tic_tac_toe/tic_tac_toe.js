import React from "react";
import {connect} from "react-redux";
import {Col, Label, Row} from "react-bootstrap";
import Board from "./presentational_components/board/board";
import * as gameActions from "../../actions/game_actions";
import * as selectors from "../../selectors/selectors";
import "./assets/tic_tac_toe.css";

@connect((state) => {
  return {
    board: selectors.getBoard(state),
    currentPlayer: selectors.getCurrentPlayer(state),
    theWinner: selectors.getTheWinner(state),
    winnerCells: selectors.getWinnerCells(state),
    isBoardFull: selectors.getIsBoardFull(state)
  };
}, (dispatch) => {
  return {
    play: (rowIndex, colIndex, player) => dispatch(gameActions.play(rowIndex, colIndex, player)),
    startNewGame: () => dispatch(gameActions.startNewGame())
  };
})
class TicTacToe extends React.Component {
  constructor(props, context, ...args) {
    super(props, context, ...args);
  }

  onPlay(rowIndex, colIndex) {
    this.props.play(rowIndex, colIndex, this.props.currentPlayer);
  }

  startNewGame() {
    this.props.startNewGame();
  }

  render() {
    let {board, currentPlayer, theWinner, winnerCells = [], isBoardFull} = this.props;
    const gameOver = theWinner || isBoardFull;
    return (
      <Row style={{margin: "0px 20px"}}>
        <div className="game-status">
          <h3><Label bsStyle="default">Current Player:&nbsp;{currentPlayer}</Label></h3>
          {theWinner && <h3><Label bsStyle="success">The Winner:&nbsp;{theWinner}</Label></h3>}
          {!theWinner && gameOver && <h3><Label bsStyle="danger">DRAW</Label></h3>}
          {gameOver &&
          <h3 className="pointer" onClick={this.startNewGame.bind(this)}><Label bsStyle="primary">Start New Game</Label>
          </h3>}
        </div>
        <Col xs={12}>
          <Board board={board} currentPlayer={currentPlayer} onPlay={this.onPlay.bind(this)} gameOver={!!gameOver}
                 winnerCells={winnerCells}/>
        </Col>
      </Row>
    );
  }
}

export default TicTacToe;