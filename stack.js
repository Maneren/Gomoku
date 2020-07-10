class Stack extends Array {
  get top() {
    return this[this.length - 1]
  }
  
  get isEmpty() {
    return this.length > 0;
  }
}