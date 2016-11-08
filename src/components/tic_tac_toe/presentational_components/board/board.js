import React, {PropTypes} from "react";
import {Col, Label, Row} from "react-bootstrap";
import "./assets/board.css";

class Board extends React.Component {
  constructor(props, context, ...args) {
    super(props, context, ...args);
  }

  onPlay(rowIndex, colIndex, cellValue) {
    if (!cellValue && !this.props.disabled) {
      this.props.onPlay(rowIndex, colIndex);
    }
  }

  renderBoardCell(rowIndex, boardCell, colIndex) {
    let {disabled} = this.props;
    let classNames = ["board-cell"];
    if(!(boardCell || disabled)){
      classNames.push("pointer");
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
    let {board, currentPlayer, disabled} = this.props;
    let classes = ["board"];
    if (disabled) {
      classes.push("disabled-board");
    }
    return (
      <Row className={classes.join(" ")} style={{opacity: disabled ? 0.8 : 1}}>
        <Col xs={12}>
          <h4>
            <Label className="margin-left-20" bsStyle="primary">Current Player:&nbsp;{currentPlayer}</Label>
          </h4>
        </Col>
        <Col xs={12}>
          {board.map(this.renderBoardRow.bind(this))}
        </Col>
      </Row>
    );
  }
}

Board.propTypes = {
  board: PropTypes.array.isRequired,
  onPlay: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  currentPlayer: PropTypes.string.isRequired
};

export default Board;