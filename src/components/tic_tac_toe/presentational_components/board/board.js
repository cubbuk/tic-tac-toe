import React, {PropTypes} from "react";
import {Col, Row} from "react-bootstrap";
import "./assets/board.css";
import gameHelper from "../../../../reducers/game_reducers/game_helper";

class Board extends React.Component {
  constructor(props, context, ...args) {
    super(props, context, ...args);
  }

  onPlay(rowIndex, colIndex, cellValue) {
    if (!cellValue && !this.props.gameOver) {
      this.props.onPlay(rowIndex, colIndex);
    }
  }

  renderBoardCell(rowIndex, boardCell, colIndex) {
    let {gameOver, winnerCells = []} = this.props;
    let classNames = ["board-cell"];
    if (gameHelper.isWinnerCell(winnerCells, rowIndex, colIndex)) {
      classNames.push("winner-cell");
    }
    if (!(boardCell || gameOver)) {
      classNames.push("pointer");
    } else if (gameOver) {
      classNames.push("board-cell-game-over");
    }
    return <Col className={classNames.join(" ")}
                onClick={this.onPlay.bind(this, rowIndex, colIndex, boardCell)}
                xs={4}
                key={colIndex}>{boardCell || <span>&nbsp;</span>}
    </Col>;
  }

  renderBoardRow(boardRow, rowIndex) {
    return <Row className="board-row" key={rowIndex}>{boardRow.map(this.renderBoardCell.bind(this, rowIndex))}</Row>;
  }

  render() {
    let {board} = this.props;
    return (<div>{board.map(this.renderBoardRow.bind(this))}</div>);
  }
}

Board.propTypes = {
  board: PropTypes.array.isRequired,
  onPlay: PropTypes.func.isRequired,
  gameOver: PropTypes.bool,
  currentPlayer: PropTypes.string.isRequired,
  winnerCells: PropTypes.array
};

export default Board;