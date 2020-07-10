const boardSize = 3;
let board = [];
const turns = new Stack();
let tileSize;

const state = {
  playing: true,
  activePlayer: 0
};

function setup () {
  createCanvas(600, 600);

  tileSize = 600 / boardSize;

  for (let y = 0; y < boardSize; y++) {
    board[y] = [];
    for (let x = 0; x < boardSize; x++) {
      board[y][x] = -1;
    }
  }

  board = [
    [0, 1, 1],
    [-1, 1, -1],
    [-1, 0, 0]
  ];

  background(50);
}

function draw () {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board.length; x++) {
      drawTile(x, y);
    }
  }
}

function drawTile (x, y) {
  const size = tileSize;

  noFill();
  stroke(255);
  strokeWeight(1);

  square(x * size, y * size, size);

  strokeWeight(3);

  const offset = size / 2;
  const xD = x * size + offset;
  const yD = y * size + offset;

  switch (board[y][x]) {
    case 0:
      const r = offset / 2;
      line(xD - r, yD - r, xD + r, yD + r);
      line(xD - r, yD + r, xD + r, yD - r);
      break;
    case 1:
      circle(xD, yD, offset);
      break;
  }
}

function mouseClicked (event) {
  if (!state.playing) return true;

  let x = floor(mouseX / tileSize);
  let y = floor(mouseY / tileSize);

  console.log(x, y);

  if (state.activePlayer === 0) {
    const move = bestMove(board, state.activePlayer, turns.top);
    x = move.x;
    y = move.y;
  }

  if (x >= boardSize || y >= boardSize) return true;

  if (board[y][x] === -1) {
    board[y][x] = state.activePlayer;

    turns.push({ x, y });

    state.activePlayer = (state.activePlayer + 1) % 2;
  }

  const check = checkWinner();
  if (check.ended) state.playing = false;
  if (check.won) {
    stroke(0, 0, 255);
    strokeWeight(10);
    const offset = tileSize / 2;
    const xD1 = check.start.x * tileSize + offset;
    const yD1 = check.start.y * tileSize + offset;
    const xD2 = check.end.x * tileSize + offset;
    const yD2 = check.end.y * tileSize + offset;
    line(xD1, yD1, xD2, yD2);
  }

  return false;
}

function runMinimax () {
  state.playing = false;
  const result = new MiniMaxBoard(board, state.activePlayer, turns.top);
  console.log(result.value);
  console.log(result);
  state.playing = true;
  return result.bestMove;
}

function checkWinner () {
  const neededToWin = 3;
  const searchOffset = neededToWin - 1;

  const opponent = target => (target + 1) % 2;

  let checking = 0;

  let start;

  const last = turns.top;

  let horizontal = 0;
  for (let x = last.x - searchOffset; x <= last.x + searchOffset; x++) {
    if (x < 0 || x >= board.length) continue;
    const tile = board[last.y][x];
    if (tile === checking) {
      if (horizontal === 0) start = { x, y: last.y };
      horizontal++;
    } else if (tile === opponent(checking)) {
      start = { x, y: last.y };
      horizontal = 1;
      checking = opponent(checking);
    } else horizontal = 0;
    if (horizontal >= neededToWin) return { ended: true, won: true, player: checking, start, end: { x, y: last.y } };
  }

  let vertical = 0;
  for (let y = last.y - searchOffset; y <= last.y + searchOffset; y++) {
    if (y < 0 || y >= board.length) continue;
    const tile = board[y][last.x];
    if (tile === checking) {
      if (vertical === 0) start = { x: last.x, y };
      vertical++;
    } else if (tile === opponent(checking)) {
      start = { x: last.x, y };
      vertical = 1;
      checking = opponent(checking);
    } else vertical = 0;
    if (vertical >= neededToWin) return { ended: true, won: true, player: checking, start, end: { x: last.x, y } };
  }

  let diagonal1 = 0;
  for (let y = last.y - searchOffset, x = last.x - searchOffset; y <= last.y + searchOffset; y++, x++) {
    if (y < 0 || y >= board.length || x < 0 || x >= board.length) continue;
    const tile = board[y][x];
    if (tile === checking) {
      if (diagonal1 === 0) start = { x, y };
      diagonal1++;
    } else if (tile === opponent(checking)) {
      start = { x, y };
      diagonal1 = 1;
      checking = opponent(checking);
    } else diagonal1 = 0;
    if (diagonal1 >= neededToWin) return { ended: true, won: true, player: checking, start, end: { x, y } };
  }

  let diagonal2 = 0;
  for (let y = last.y + searchOffset, x = last.x - searchOffset; y >= last.y - searchOffset; y--, x++) {
    if (y < 0 || y >= board.length || x < 0 || x >= board.length) continue;
    const tile = board[y][x];
    if (tile === checking) {
      if (diagonal2 === 0) start = { x, y };
      diagonal2++;
    } else if (tile === opponent(checking)) {
      start = { x, y };
      diagonal2 = 1;
      checking = opponent(checking);
    } else diagonal2 = 0;
    if (diagonal2 >= neededToWin) return { ended: true, won: true, player: checking, start, end: { x, y } };
  }

  const availableTiles = [];
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board.length; x++) {
      if (board[y][x] === -1) availableTiles.push({ x, y });
    }
  }
  if (availableTiles.length > 0) {
    return { ended: false };
  } else return { ended: true, won: false };
}
