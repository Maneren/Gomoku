// class MiniMaxBoard {
//   constructor (board, targetPlayer, lastTurn, depth = 0, activePlayer = null) {
//     this.board = board;

//     this.activePlayer = activePlayer === null ? targetPlayer : activePlayer;
//     this.targetPlayer = targetPlayer;

//     this.isMaximizing = this.activePlayer === this.targetPlayer;

//     this.lastTurn = lastTurn;

//     this.depth = depth;

//     this.eval();

//     return this;
//   }

//   eval () {
//     const win = this.checkWinner(this.targetPlayer);

//     if (win === 0) {
//       const availableTiles = [];
//       for (let y = 0; y < this.board.length; y++) {
//         for (let x = 0; x < this.board.length; x++) {
//           if (this.board[y][x] === -1) availableTiles.push({ x, y });
//         }
//       }
//       if (availableTiles.length > 0) {
//         this.value = this.bestNextBoard(availableTiles).value;
//       } else this.value = 0;

//       return;
//     }

//     this.value = win * (1000 - this.depth);
//   }

//   bestNextBoard (availableTiles) {
//     const nextBoards = [];

//     for (const tile of availableTiles) {
//       // const tempBoard = deepCopy(this.board);
//       // tempBoard[tile.y][tile.x] = this.activePlayer;
//       this.board[tile.y][tile.x] = this.activePlayer;

//       const newBoard = new MiniMaxBoard(this.board, this.targetPlayer, tile, this.depth + 1, this.opponent);
//       nextBoards.push(newBoard.value);

//       this.board[tile.y][tile.x] = -1;
//     }
//     this.nextBoards = nextBoards;

//     let best; let bestI = -1;
//     if (this.isMaximizing) {
//       best = -Infinity;
//       for (let i = 0; i < nextBoards.length; i++) {
//         const board = nextBoards[i];
//         if (board > best) {
//           best = board;
//           bestI = i;
//         }
//       }
//     } else {
//       best = Infinity;
//       for (let i = 0; i < nextBoards.length; i++) {
//         const board = nextBoards[i];
//         if (board < best) {
//           best = board;
//           bestI = i;
//         }
//       }
//     }
//     this.bestMove = availableTiles[bestI];
//     return best;
//   }

//   get opponent () {
//     return (this.activePlayer + 1) % 2;
//   }

//   checkWinner (target) {
//     const neededToWin = 3;
//     const searchOffset = neededToWin - 1;

//     const opponent = target => (target + 1) % 2;

//     let checking = target;

//     const last = this.lastTurn;

//     if (last === undefined) return 0;

//     let horizontal = 0;
//     for (let x = last.x - searchOffset; x <= last.x + searchOffset; x++) {
//       if (x < 0 || x >= this.board.length) continue;
//       const tile = this.board[last.y][x];
//       if (tile === checking) horizontal++;
//       else if (tile === opponent(checking)) {
//         horizontal = 1;
//         checking = opponent(checking);
//       } else horizontal = 0;
//       if (horizontal >= neededToWin) return target === checking ? 1 : -1;
//     }

//     let vertical = 0;
//     for (let y = last.y - searchOffset; y <= last.y + searchOffset; y++) {
//       if (y < 0 || y >= this.board.length) continue;
//       const tile = this.board[y][last.x];
//       if (tile === checking) vertical++;
//       else if (tile === opponent(checking)) {
//         vertical = 1;
//         checking = opponent(checking);
//       } else vertical = 0;
//       if (vertical >= neededToWin) return target === checking ? 1 : -1;
//     }

//     let diagonal1 = 0;
//     for (let y = last.y - searchOffset, x = last.x - searchOffset; y <= last.y + searchOffset; y++, x++) {
//       if (y < 0 || y >= this.board.length || x < 0 || x >= this.board.length) continue;
//       const tile = this.board[y][x];
//       if (tile === checking) diagonal1++;
//       else if (tile === opponent(checking)) {
//         diagonal1 = 1;
//         checking = opponent(checking);
//       } else diagonal1 = 0;
//       if (diagonal1 >= neededToWin) return target === checking ? 1 : -1;
//     }

//     let diagonal2 = 0;
//     for (let y = last.y + searchOffset, x = last.x - searchOffset; y >= last.y - searchOffset; y--, x++) {
//       if (y < 0 || y >= this.board.length || x < 0 || x >= this.board.length) continue;
//       const tile = this.board[y][x];
//       if (tile === checking) diagonal2++;
//       else if (tile === opponent(checking)) {
//         diagonal2 = 1;
//         checking = opponent(checking);
//       } else diagonal2 = 0;
//       if (diagonal2 >= neededToWin) return target === checking ? 1 : -1;
//     }

//     return 0;
//   }
// }

// function deepCopy (arr) {
//   const len = arr.length;
//   const newArr = new Array(len);
//   for (var i = 0; i < len; i++) {
//     if (Array.isArray(arr[i])) {
//       newArr[i] = deepCopy(arr[i]);
//     } else {
//       newArr[i] = arr[i];
//     }
//   }
//   return newArr;
// }

function bestMove (board, targetPlayer, lastTurn, isMaximizing) {
  // AI to make its turn
  let bestScore = -Infinity;
  let move;
  const availableTiles = [];
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board.length; x++) {
      if (board[y][x] === -1) availableTiles.push({ x, y });
    }
  }
  for (const tile of availableTiles) {
    const { x, y } = tile;
    board[y][x] = targetPlayer;
    const score = minimax(board, 0, targetPlayer, lastTurn, false);
    board[y][x] = -1;
    if (score > bestScore) {
      bestScore = score;
      move = { x, y };
    }
  }

  return { x: move.x, y: move.y };
}

function minimax (board, depth, targetPlayer, lastTurn, isMaximizing = true) {
  const availableTiles = [];
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board.length; x++) {
      if (board[y][x] === -1) availableTiles.push({ x, y });
    }
  }

  const result = checkWinnerMM(board, targetPlayer, lastTurn);
  if (availableTiles.length > 0 && result !== 0) {
    return result * (100 - depth);
  } else if (availableTiles.length < 1) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const tile of availableTiles) {
      const { x, y } = tile;
      board[y][x] = targetPlayer;
      const score = minimax(board, depth + 1, targetPlayer, tile, false);
      board[y][x] = -1;
      bestScore = max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const tile of availableTiles) {
      const { x, y } = tile;
      board[y][x] = opponent(targetPlayer);
      const score = minimax(board, depth + 1, targetPlayer, lastTurn, true);
      board[y][x] = -1;
      bestScore = min(score, bestScore);
    }
    return bestScore;
  }
}

const opponent = target => (target + 1) % 2;

function checkWinnerMM (board, target, last) {
  const neededToWin = 3;
  const searchOffset = neededToWin - 1;

  let checking = target;

  if (last === undefined) return 0;

  let horizontal = 0;
  for (let x = last.x - searchOffset; x <= last.x + searchOffset; x++) {
    if (x < 0 || x >= board.length) continue;
    const tile = board[last.y][x];
    if (tile === checking) horizontal++;
    else if (tile === opponent(checking)) {
      horizontal = 1;
      checking = opponent(checking);
    } else horizontal = 0;
    if (horizontal >= neededToWin) return target === checking ? 1 : -1;
  }

  let vertical = 0;
  for (let y = last.y - searchOffset; y <= last.y + searchOffset; y++) {
    if (y < 0 || y >= board.length) continue;
    const tile = board[y][last.x];
    if (tile === checking) vertical++;
    else if (tile === opponent(checking)) {
      vertical = 1;
      checking = opponent(checking);
    } else vertical = 0;
    if (vertical >= neededToWin) return target === checking ? 1 : -1;
  }

  let diagonal1 = 0;
  for (let y = last.y - searchOffset, x = last.x - searchOffset; y <= last.y + searchOffset; y++, x++) {
    if (y < 0 || y >= board.length || x < 0 || x >= board.length) continue;
    const tile = board[y][x];
    if (tile === checking) diagonal1++;
    else if (tile === opponent(checking)) {
      diagonal1 = 1;
      checking = opponent(checking);
    } else diagonal1 = 0;
    if (diagonal1 >= neededToWin) return target === checking ? 1 : -1;
  }

  let diagonal2 = 0;
  for (let y = last.y + searchOffset, x = last.x - searchOffset; y >= last.y - searchOffset; y--, x++) {
    if (y < 0 || y >= board.length || x < 0 || x >= board.length) continue;
    const tile = board[y][x];
    if (tile === checking) diagonal2++;
    else if (tile === opponent(checking)) {
      diagonal2 = 1;
      checking = opponent(checking);
    } else diagonal2 = 0;
    if (diagonal2 >= neededToWin) return target === checking ? 1 : -1;
  }

  return 0;
}
