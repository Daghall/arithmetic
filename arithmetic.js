import divide from "./divide.js";

export default class Arithmetic {
  constructor(drawCallBack) {
    this.activeOperand = "left";
    this.operands = {
      left: randomInt(1, 9),
      right: randomInt(1, 9),
    };

    this.operations = [
      "+",
      "−",
      "×",
      "÷",
    ];
    this.operation = this.operations[randomInt(3)];

    this.draw = drawCallBack;
  }

  changeOperand(operand) {
    if (operand) {
      this.activeOperand = operand;
      this.draw();
      return;
    }

    this.activeOperand = this.activeOperand === "left" ? "right" : "left";
    this.draw();
  }

  swapOperands() {
    const left = this.operands.left;
    this.operands.left = this.operands.right;
    this.operands.right = left;
    this.draw();
  }

  setOperand(value) {
    this.operands[this.activeOperand] = parseInt(value);
    this.draw();
  }

  switchOperation() {
    const nextOperation = (this.operations.findIndex((i) => i === this.operation) + 1) % this.operations.length;
    this.operation = this.operations[nextOperation];
    this.draw();
  }

  setOperation(operation) {
    this.operation = operation;
    this.draw();
  }

  increaseActiveOperand() {
    this.operands[this.activeOperand] = (this.operands[this.activeOperand] + 1) % 10;
    this.draw();
  }

  decreaseActiveOperand() {
    this.operands[this.activeOperand] = (this.operands[this.activeOperand] + 9) % 10;
    this.draw();
  }

  getResult() {
    switch (this.operation) {
      case "+":
        return this.operands.left + this.operands.right;
      case "−":
        return (this.operands.left - this.operands.right).toString().replace("-", "−");
      case "×":
        return this.operands.left * this.operands.right;
      case "÷": {
        if (this.operands.right === 0) {
          return "?";
        } else if (this.operands.left === 0) {
          return 0;
        }

        return divide(this.operands.left, this.operands.right);
      }
    }
  }
}

function randomInt(from, to) {
  const min = to ? from : 0;
  const max = to ? to - from : from;

  return Math.round(Math.random() * max) + min;
}
