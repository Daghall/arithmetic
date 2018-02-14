export default class Controls {
  constructor(arithmetic, canvas, properties) {
    this.arithmetic = arithmetic;
    this.setupEventListeners();
    this.properties = properties;
    this.canvas = canvas;
    this.keySequence = [];
  }

  registerKey(key) {
    this.keySequence.push(key);
  }

  resetKeySequence() {
    this.keySequence = [];
  }

  konami() {
    const r1 = Math.random();
    const r2 = Math.random();
    const r3 = Math.random();
    const r4 = Math.random();
    const r5 = Math.random();
    const r6 = Math.random();
    const x = this.properties.canvasWidth * r1;
    const y = this.properties.canvasHeight * r2;
    this.canvas.font = `${r3 * 60}px arial`;
    this.canvas.fillStyle = `#${Math.round(r4 * 255).toString(16)}${Math.round(r5 * 255).toString(16)}${Math.round(r6 * 256).toString(16)}`;
    this.canvas.fillText([78, 69, 82, 68].map((n) => String.fromCharCode(n)).join(""), x, y);
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
          this.registerKey("number");
          break;
        case "Tab":
          this.arithmetic.changeOperand();
          this.registerKey("tab");
          event.preventDefault();
          break;
        case "Enter":
          this.arithmetic.swapOperands();
          this.registerKey("enter");
          break;
        case " ":
          this.arithmetic.switchOperation();
          this.registerKey("space");
          break;
        case "+":
          this.arithmetic.setOperation("+");
          this.registerKey("operation");
          break;
        case "-":
          this.arithmetic.setOperation("−");
          this.registerKey("operation");
          break;
        case "*":
          this.arithmetic.setOperation("×");
          this.registerKey("operation");
          break;
        case "/":
          this.arithmetic.setOperation("÷");
          this.registerKey("operation");
          break;
        case "ArrowUp":
          this.arithmetic.increaseActiveOperand();
          this.registerKey("up");
          break;
        case "ArrowDown":
          this.arithmetic.decreaseActiveOperand();
          this.registerKey("down");
          break;
        case "ArrowLeft":
          this.registerKey("left");
          break;
        case "ArrowRight":
          this.registerKey("right");
          break;
        case "a":
          this.registerKey("a");
          break;
        case "b":
          this.registerKey("b");
          break;
        default:
          console.log("Unused key: %s", event.key); // eslint-disable-line no-console
      }

      // Look for key sequence
      const keySequence = this.keySequence.join(">");
      switch (keySequence) {
        case "number":
          break;
        case "number>operation":
          if (this.arithmetic.activeOperand === "left") {
            this.arithmetic.changeOperand();
          } else {
            this.resetKeySequence();
          }
          break;
        case "number>operation>number":
          if (this.arithmetic.activeOperand === "right") {
            this.arithmetic.changeOperand();
          } else {
            this.resetKeySequence();
          }
          break;
        case "up>up>down>down>left>right>left>right>b>a":
          this.konamiInterval = setInterval(this.konami.bind(this), 0);
          this.resetKeySequence();
          break;
        default:
          clearInterval(this.konamiInterval);
          if (!"up>up>down>down>left>right>left>right>b>a".startsWith(keySequence)) {
            this.resetKeySequence();
          }
      }
    });
  }
}
