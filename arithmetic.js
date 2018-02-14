import divide from "./divide.js";

export default class Arithmetic {
  constructor(drawCallBack) {
    this.activeOperand = "left";
    this.operands = {
      left: 0,
      right: 0
    };

    this.operations = [
      "+",
      "−",
      "×",
      "÷",
    ];
    this.operation = this.operations[0];

    this.draw = drawCallBack;
  }

  changeOperand() {
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
        if (this.operands.left === 0) {
          return 0;
        } else if (this.operands.right === 0) {
          return "?";
        }

        return divide(this.operands.left, this.operands.right);
      }
    }
  }
}
