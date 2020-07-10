function checkWinner (board, last) {
  const neededToWin = 3;
  const searchOffset = neededToWin - 1;

  const opponent = target => (target + 1) % 2;

  let checking = 0;

  let start;

  let horizontal = 0;
  for (let x = last.x - searchOffset; x <= last.x + searchOffset; x++) {
    if (x < 0 || x >= board.length) continue;
    const tile = board[last.y][x];
    if (tile === checking) {
      if (horizontal === 0) start = { x, y: last.y };
      horizontal++;
    } else if (tile === opponent(checking)) {
      horizontal = 1;
      checking = opponent(checking);
    } else horizontal = 0;
    if (horizontal >= neededToWin) return { won: true, player: checking, start, end: { x, y: last.y } };
  }

  let vertical = 0;
  for (let y = last.y - searchOffset; y <= last.y + searchOffset; y++) {
    if (y < 0 || y >= board.length) continue;
    const tile = board[y][last.x];
    if (tile === checking) {
      if (vertical === 0) start = { x: last.x, y };
      vertical++;
    } else if (tile === opponent(checking)) {
      vertical = 1;
      checking = opponent(checking);
    } else vertical = 0;
    if (vertical >= neededToWin) return { won: true, player: checking, start, end: { x: last.x, y } };
  }

  let diagonal1 = 0;
  for (let y = last.y - searchOffset, x = last.x - searchOffset; y <= last.y + searchOffset; y++, x++) {
    if (y < 0 || y >= board.length || x < 0 || x >= board.length) continue;
    const tile = board[y][x];
    if (tile === checking) {
      if (diagonal1 === 0) start = { x, y };
      diagonal1++;
    } else if (tile === opponent(checking)) {
      diagonal1 = 1;
      checking = opponent(checking);
    } else diagonal1 = 0;
    if (diagonal1 >= neededToWin) return { won: true, player: checking, start, end: { x, y } };
  }

  let diagonal2 = 0;
  for (let y = last.y + searchOffset, x = last.x - searchOffset; y >= last.y - searchOffset; y--, x++) {
    if (y < 0 || y >= board.length || x < 0 || x >= board.length) continue;
    const tile = board[y][x];
    if (tile === checking) {
      if (diagonal2 === 0) start = { x, y };
      diagonal2++;
    } else if (tile === opponent(checking)) {
      diagonal2 = 1;
      checking = opponent(checking);
    } else diagonal2 = 0;
    if (diagonal2 >= neededToWin) return { won: true, player: checking, start, end: { x, y } };
  }

  return { won: false, player: checking };
}

const board = [
  [0, 1, 1],
  [1, 1, -1],
  [0, 1, 0]
];

console.log(checkWinner(board, { x: 1, y: 2 }));
