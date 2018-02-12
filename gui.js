import Controls from "./controls.js";
import Arithemic from "./arithmetic.js";

let arithmetic;
let canvas;
let controls;
const properties = {};
const colors = {
  backgound: "wheat",
  left: "darkcyan",
  right: "brown",
  default: "black",
  inactive: "tan",
  active: "white",
};
const fonts = {
  default: "48px arial",
  fraction: "24px arial",
};


function init() {
  const canvasElement = document.querySelector("canvas");
  canvas = canvasElement.getContext("2d");
  properties.canvasWidth = canvasElement.getAttribute("width");
  properties.canvasHeight = canvasElement.getAttribute("height");
  properties.center = properties.canvasWidth / 2;

  canvas.textAlign = "center";
  canvas.lineWidth = 3;

  arithmetic = new Arithemic(draw);
  controls = new Controls(arithmetic);
  draw();
}

function draw() {
  reset();
  drawNumbers();
}

function reset() {
  canvas.fillStyle = colors.backgound;
  canvas.fillRect(0, 0, properties.canvasWidth, properties.canvasHeight);
}

function drawNumbers() {
  canvas.font = fonts.default;
  const top = 75;

  // Left
  canvas.fillStyle = colors.left;
  canvas.fillText(arithmetic.operands.left, properties.center - 50, top);
  canvas.strokeStyle = arithmetic.activeOperand === "left" ? colors.active : colors.inactive;
  canvas.strokeRect(properties.center - 75, top - parseInt(fonts.default), 50, 60);

  // Operation
  canvas.fillStyle = colors.default;
  canvas.fillText(arithmetic.operation, properties.center, top);

  // Right
  canvas.fillStyle = colors.right;
  canvas.fillText(arithmetic.operands.right, properties.center + 50, top);
  canvas.strokeStyle = arithmetic.activeOperand === "right" ? colors.active : colors.inactive;
  canvas.strokeRect(properties.center + 25, top - parseInt(fonts.default), 50, 60);

  // Equals
  canvas.fillStyle = colors.default;
  canvas.fillText("=", properties.center + 100, top);

  // Result
  const result = arithmetic.getResult();
  canvas.fillStyle = colors.default;
  if (typeof result !== "object") {
    canvas.fillText(result, properties.center + 150, top);
  } else {
    if (result.integer) {
      canvas.fillText(result.integer, properties.center + 150, top);
    }

    if (result.denominator !== result.numerator) {
      // Fraction divider
      canvas.strokeStyle = colors.default;
      canvas.moveTo(properties.center + 170, top - 15);
      canvas.lineTo(properties.center + 190, top - 15);
      canvas.stroke();

      // Numbers
      canvas.font = fonts.fraction;
      canvas.fillText(result.numerator || result, properties.center + 180, top - 25);
      canvas.fillText(result.denominator || result, properties.center + 180, top + 10);
    }
  }
}

init();
