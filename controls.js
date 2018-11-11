export default function Controls(arithmetic, canvas, properties) {
  let keySequence = [];
  let gradiusInterval;

  setupEventListeners();

  function registerKey(key) {
    keySequence.push(key);
  }

  function resetKeySequence() {
    keySequence = [];
  }

  function gradius() {
    const r1 = Math.random();
    const r2 = Math.random();
    const r3 = Math.random();
    const r4 = Math.random();
    const r5 = Math.random();
    const r6 = Math.random();
    const x = properties.canvasWidth * r1;
    const y = properties.canvasHeight * r2;
    canvas.font = `${r3 * 60}px arial`;
    canvas.fillStyle = `#${Math.round(r4 * 255).toString(16)}${Math.round(r5 * 255).toString(16)}${Math.round(r6 * 256).toString(16)}`;
    canvas.fillText([78, 69, 82, 68].map((n) => String.fromCharCode(n)).join(""), x, y);
  }

  function setupEventListeners() {
    const preventDefaultKeys = [
      "Tab",
      " ",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
    ];

    window.addEventListener("keydown", (event) => {
      if (preventDefaultKeys.includes(event.key)) {
        event.preventDefault();
      }

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
          arithmetic.setOperand(event.key);
          registerKey("number");
          break;
        case "Tab":
          arithmetic.changeOperand();
          registerKey("tab");
          break;
        case "Enter":
          arithmetic.swapOperands();
          registerKey("enter");
          break;
        case " ":
          arithmetic.switchOperation();
          registerKey("space");
          break;
        case "+":
          arithmetic.setOperation("+");
          registerKey("operation");
          break;
        case "-":
          arithmetic.setOperation("−");
          registerKey("operation");
          break;
        case "*":
          arithmetic.setOperation("×");
          registerKey("operation");
          break;
        case "/":
          arithmetic.setOperation("÷");
          registerKey("operation");
          break;
        case "ArrowUp":
          arithmetic.increaseActiveOperand();
          registerKey("up");
          break;
        case "ArrowDown":
          arithmetic.decreaseActiveOperand();
          registerKey("down");
          break;
        case "ArrowLeft":
          arithmetic.changeOperand("left");
          registerKey("left");
          break;
        case "ArrowRight":
          arithmetic.changeOperand("right");
          registerKey("right");
          break;
        case "a":
          registerKey("a");
          break;
        case "b":
          registerKey("b");
          break;
        case "r":
          arithmetic.randomize();
          break;
        case ":":
          arithmetic.toggleVisualization();
          break;
        default:
          console.log("Unused key: %s", event.key); // eslint-disable-line no-console
      }

      // Look for key sequence
      const currentKeySequence = keySequence.join(">");
      switch (currentKeySequence) {
        case "number":
          break;
        case "number>operation":
          if (arithmetic.activeOperand === "left") {
            arithmetic.changeOperand();
          } else {
            resetKeySequence();
          }
          break;
        case "number>operation>number":
          if (arithmetic.activeOperand === "right") {
            arithmetic.changeOperand();
          }

          resetKeySequence();
          break;
        case "up>up>down>down>left>right>left>right>b>a":
          gradiusInterval = setInterval(gradius.bind(canvas), 0);
          resetKeySequence();
          break;
        default:
          clearInterval(gradiusInterval);
          if (!"up>up>down>down>left>right>left>right>b>a".startsWith(currentKeySequence)) {
            resetKeySequence();
          }
      }
    });
  }
}
