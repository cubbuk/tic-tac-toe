import React, {PropTypes} from "react";
import {Col, Label, Row} from "react-bootstrap";
import "./assets/board.css";

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
    let {gameOver} = this.props;
    let classNames = ["board-cell"];
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
    let {board, currentPlayer} = this.props;
    return (
        <Col xs={12}>
          {board.map(this.renderBoardRow.bind(this))}
        </Col>
    );
  }
}

Board.propTypes = {
  board: PropTypes.array.isRequired,
  onPlay: PropTypes.func.isRequired,
  gameOver: PropTypes.bool,
  currentPlayer: PropTypes.string.isRequired
};

export default Board;