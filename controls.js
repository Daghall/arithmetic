export default class Controls {
  constructor(arithmetic) {
    this.arithmetic = arithmetic;
    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          this.arithmetic.setOperand(event.key);
          break;
        case "Tab":
          this.arithmetic.changeOperand();
          event.preventDefault();
          break;
        case "Enter":
          this.arithmetic.swapOperands();
          break;
        case " ":
          this.arithmetic.switchOperation();
          break;
        case "+":
          this.arithmetic.setOperation("+");
          break;
        case "-":
          this.arithmetic.setOperation("−");
          break;
        case "*":
          this.arithmetic.setOperation("×");
          break;
        case "/":
          this.arithmetic.setOperation("÷");
          break;
      }
    });
  }
}
