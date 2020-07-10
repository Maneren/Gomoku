class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.value = -1;
  }

  
  get isEmpty() {
    return this.value === -1;
  }

  click(val) {
    this.value = val;
  }
}