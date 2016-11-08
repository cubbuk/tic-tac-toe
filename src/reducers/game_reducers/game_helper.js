class GameHelpers {

  checkCellArray(cellArray) {
    let allSame = true;
    for (let i = 1; allSame && i < cellArray.length; i++) {
      allSame = cellArray[0] && cellArray[i] === cellArray[0];
    }
    return allSame;
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
    const diagonal = this.boardToDiagonalArray(newBoard)
    winner = this.checkCellArray(diagonal);
    if (!winner) {
      for (let i = 0; !winner && i < boardSize; i++) {
        const row = newBoard[i];
        const col = this.boardToColArray(newBoard, i);
        winner = this.checkCellArray(row) || this.checkCellArray(col);
      }
    }
    return winner;
  }

  createWinnerCell(rowIndex, colIndex) {
    return {rowIndex, colIndex};
  }

  createWinnerCellsFromRow(row, rowIndex) {
    return row.map((cell, colIndex) => this.createWinnerCell(rowIndex, colIndex));
  }

  createWinnerCellsFromCol(cols, colIndex) {
    return cols.map((cell, rowIndex) => this.createWinnerCell(rowIndex, colIndex));
  }

  createWinnerCellsFromDiagonal(newBoard) {
    return newBoard.map((row, rowIndex) => this.createWinnerCell(rowIndex, rowIndex));
  }

  computeWinnerCells(newBoard, boardSize) {
    let winnerCells = [];
    const diagonal = this.boardToDiagonalArray(newBoard);
    if (this.checkCellArray(diagonal)) {
      winnerCells = this.createWinnerCellsFromDiagonal(newBoard);
    } else {
      for (let i = 0; winnerCells.length === 0 && i < boardSize; i++) {
        const row = newBoard[i];
        const col = this.boardToColArray(newBoard, i);
        if (this.checkCellArray(row)) {
          winnerCells = this.createWinnerCellsFromRow(row, i);
        }
        else if (this.checkCellArray(col)) {
          winnerCells = this.createWinnerCellsFromCol(col, i);
        }
      }
    }
    return winnerCells;
  }

  isWinnerCell(winnerCells = [], rowIndex, colIndex) {
    return winnerCells.filter(winnerCell => winnerCell.rowIndex === rowIndex && winnerCell.colIndex === colIndex).length > 0;
  }
}

export default new GameHelpers();