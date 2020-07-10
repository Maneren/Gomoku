const boardSize = 3;
const board = [];
let turns = new Stack();
let tileSize;

const state = {
  playing: true,
  activePlayer: 0
}

function setup() {
  createCanvas(600, 600);

  tileSize = 600 / boardSize;

  for (let y = 0; y < boardSize; y++) {
    board[y] = [];
    for (let x = 0; x < boardSize; x++) {
      board[y][x] = -1;
    }
  }

  background(50);
}



function draw() {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board.length; x++) {
      drawTile(x, y);
    }
  }
}

function drawTile(x, y) {
  const size = tileSize;

  noFill();
  stroke(255);
  strokeWeight(1);

  square(x * size, y * size, size);

  strokeWeight(3);

  let offset = size / 2;
  let xD = x * size + offset;
  let yD = y * size + offset;

  switch (board[y][x]) {
    case 0:
      let r = offset / 2;
      line(xD - r, yD - r, xD + r, yD + r);
      line(xD - r, yD + r, xD + r, yD - r);
      break;
    case 1:
      circle(xD, yD, offset);
      break;
  }
}

function mouseClicked(event) {
  if (!state.playing) return true;

  let x = floor(mouseX / tileSize);
  let y = floor(mouseY / tileSize);

  console.log(x, y)

  if (x >= boardSize || y >= boardSize) return true;

  if (board[y][x] === -1) {
    if (state.activePlayer === 1) {
      [x, y] = runMinimax();
    }

    board[y][x] = state.activePlayer;

    turns.push({ x: x, y: y });

    state.activePlayer = (state.activePlayer + 1) % 2;
  }
  return false;
}

function runMinimax() {
  let result = new MiniMaxBoard(board, state.activePlayer, turns.top);
  console.log(result);
  console.log(result.value);
  console.log(result);
}