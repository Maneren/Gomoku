class MiniMaxBoard {
  constructor(board, activePlayer, lastTurn) {
    this.board = board;
    this.activePlayer = activePlayer;

    this.lastTurn = lastTurn;

    return this;
  }

  get value() {
    if (!this.evaluated) this.eval();

    if (!this.isTerminate) {
      return this.nextBoards.reduce((total, board) => {
        console.log(total, board)
        return total + board.value;
      }, 0)
    }

    return -1;
  }

  eval() {
    this.nextBoards = [];
    const availableTiles = []
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board.length; x++) {
        if (board[y][x] === -1) availableTiles.push({ x: x, y: y });
      }
    }
    
    console.log(availableTiles)

    this.checkWinner();

    for (let tile of availableTiles) {
      const tempBoard = deepCopy(this.board);
      tempBoard[tile.x][tile.y] = this.activePlayer;
      this.nextBoards.push(new MiniMaxBoard(tempBoard, (this.activePlayer + 1) % 2));
    }
  }

  checkWinner() {
    // check if opponent won this board
    const nededToWin = 3;
    const searchOffset = nededToWin - 1;

    const opponent = (this.activePlayer + 1) % 2;

    const last = this.lastTurn;
    let horizontal = 0;
    for (let x = last.x - searchOffset; x < last.x + searchOffset; x++) {
      if (x < 0 || x >= this.board.length) continue;
      const tile = this.board[last.y][x];
      if (tile === opponent) horizontal++;
      else horizontal = 0;
    }

    let vertical = 0;
    for (let y = last.y - searchOffset; y < last.y + searchOffset; y++) {
      if (y < 0 || y >= this.board.length) continue;
      const tile = this.board[y][last.x];
      if (tile === opponent) vertical++;
      else vertical = 0;
    }

    if (horizontal >= nededToWin || vertical >= nededToWin) {
      this.isTerminate = true;
    }
  }
}

/*function cloneBoard(arr) {
  // two levels deep copy 
  let clone = arr;
  for (let y = 0; y < arr.length; y++) {
    clone[y] = [].concat(clone[y])
  }
  return clone;
}*/
function deepCopy(arr) {
  var len = arr.length;
  var newArr = new Array(len);
  for (var i = 0; i < len; i++) {
    if (Array.isArray(arr[i])) {
      newArr[i] = deepCopy(arr[i]);
    }
    else {
      newArr[i] = arr[i];
    }
  }
  return newArr;
}