class GameHelpers {
  checkCellArray(cellArray) {
    let currentPlayer;
    let cellsAreSame = true;
    for (let i = 0; cellsAreSame && i < cellArray.length; i++) {
      const currentCell = cellArray[i];
      if (currentCell) {
        currentPlayer = currentCell;
        if (i > 0) {
          const previousCell = cellArray[i - 1];
          cellsAreSame = previousCell === currentCell;
        }
      } else {
        cellsAreSame = false;
      }
    }
    if (cellsAreSame) {
      return currentPlayer;
    }
  }

  boardToColArray(board, colIndex) {
    return board.map(boardRow => {
      return boardRow[colIndex];
    });
  }

  boardToDiagonalArray(board) {
    return board.map((boardRow, rowIndex) => {
      return boardRow[rowIndex];
    });
  }

  computeWinner(newBoard, boardSize) {
    let winner;
    for (let i = 0; !winner && i < boardSize; i++) {
      const row = newBoard[i];
      const col = this.boardToColArray(newBoard, i);
      const diagonal = this.boardToDiagonalArray(newBoard, i);
      winner = this.checkCellArray(row) || this.checkCellArray(col) || this.checkCellArray(diagonal);
    }
    return winner;
  }
}

export default new GameHelpers();