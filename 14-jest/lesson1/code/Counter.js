export default class Counter {
  constructor() {
    this.number = 0;
  }
  addOne() {
    this.number++;
  }
  addTwo() {
    this.number += 2;
  }
  minusOne() {
    this.number--;
  }
  minusTwo() {
    this.number -= 2;
  }
}
