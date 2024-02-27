import Arithemic from "./arithmetic.js";
import {fonts, colors} from "./constants.js";
import controls from "./controls.js";
import drawNumberLine from "./draw-number-line.js";
import drawSquares from "./draw-squares.js";

let arithmetic;
let canvas;
const properties = {};

const numeralSystems = [
  {name: "Binary", base: 2, length: 8, top: 125},
  {name: "Octal", base: 8, length: 3, top: 150, prefix: "0o"},
  {name: "Hexadecimal", base: 16, length: 2, top: 175, prefix: "0x"},
];

function init() {
  const canvasElement = document.querySelector("canvas");
  canvas = canvasElement.getContext("2d");
  properties.canvasWidth = canvasElement.getAttribute("width");
  properties.canvasHeight = canvasElement.getAttribute("height");
  properties.center = properties.canvasWidth / 2;

  canvas.textAlign = "center";

  arithmetic = new Arithemic(draw);
  controls(arithmetic, canvas, properties);
  draw();
}

function draw() {
  reset();
  drawNumbers();

  if (arithmetic.visualize) {
    drawNumberLine(canvas, arithmetic, properties);
    drawSquares(canvas, arithmetic, properties);
  } else {
    numeralSystems.forEach((system) => {
      drawNumeral(system);
    });
  }
}

function reset() {
  canvas.fillStyle = colors.backgound;
  canvas.fillRect(0, 0, properties.canvasWidth, properties.canvasHeight);
}

function drawNumbers() {
  const top = 75;
  canvas.font = fonts.default;
  canvas.lineWidth = 3;

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
      canvas.beginPath();
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

function drawNumeral({name, base, length, top, prefix}) {
  let leftOffset;
  const oldTextAlign = canvas.textAlign;

  const left = arithmetic.operands.left.toString(base);
  const right = arithmetic.operands.right.toString(base);

  let leftPadding = Array(length).fill().map((_, i) => i >= length - left.length ? " " : "0").join("");
  let rightPadding = Array(length).fill().map((_, i) => i >= length - right.length ? " " : "0").join("");

  let result = arithmetic.getResult();
  let remainder = null;

  switch (typeof result) {
    case "object":
      result = result.integer;
      remainder = (arithmetic.operands.left % arithmetic.operands.right).toString(base);
      break;
    case "string":
      // Division by zero
      if (result === "?") {
        result = Array(length).fill("?").join("");
        break;
      }

      // Negative number
      result = parseInt(result.replace("−", "-"));

      if (result < 0) {
        // Two's complement
        result *= -1;
        result ^= 0xFF;
        ++result;
        // Force octal numbers to begin with 7
        result |= (base === 8) ? 0o700 : 0;
      }
  }

  if (typeof result === "number") {
    result = result.toString(base);
  }

  result = result.toString(base).toUpperCase();
  let resultPadding = Array(length).fill().map((_, i) => i >= length - result.length ? " " : "0").join("");

  canvas.font = fonts.console;

  if (prefix) {
    leftPadding = prefix + leftPadding;
    rightPadding = prefix + rightPadding;
    resultPadding = prefix + resultPadding;
  }

  // Name
  leftOffset = properties.center - 175;
  canvas.textAlign = "left";
  canvas.fillStyle = colors.default;
  canvas.fillText(name, leftOffset, top);

  // Left operand
  leftOffset = properties.center - 20;
  canvas.textAlign = "right";
  canvas.fillStyle = colors.left;
  canvas.fillText(left, leftOffset, top);

  // Left padding
  canvas.fillStyle = colors.leftBlank;
  canvas.fillText(leftPadding, leftOffset, top);

  // Operation
  canvas.textAlign = oldTextAlign;
  canvas.fillStyle = colors.default;
  canvas.fillText(arithmetic.operation, properties.center, top);

  // Right operand
  leftOffset = properties.center + 80;
  canvas.textAlign = "right";
  canvas.fillStyle = colors.right;
  canvas.fillText(right, leftOffset, top);

  // Right padding
  canvas.fillStyle = colors.rightBlank;
  canvas.fillText(rightPadding, leftOffset, top);

  // Equals
  canvas.textAlign = oldTextAlign;
  canvas.fillStyle = colors.default;
  canvas.fillText("=", properties.center + 100, top);

  // Result
  leftOffset = properties.center + 180;
  canvas.textAlign = "right";
  canvas.fillStyle = colors.default;
  canvas.fillText(result, leftOffset, top);

  // Result padding
  canvas.fillStyle = colors.defaultBlank;
  canvas.fillText(resultPadding, leftOffset, top);

  // Remainder
  if (remainder) {
    let remainderPadding = Array(length).fill().map((_, i) => i >= length - remainder.length ? " " : "0").join("");
    if (prefix) {
      remainderPadding = prefix + remainderPadding;
    }
    leftOffset = properties.center + 260;
    canvas.textAlign = "right";
    canvas.fillStyle = colors.default;
    canvas.fillText(remainder, leftOffset, top);
    canvas.fillText("r         ", leftOffset, top);

    // Remainder padding
    canvas.fillStyle = colors.defaultBlank;
    canvas.fillText(remainderPadding, leftOffset, top);
  }

  // Restore textAlign
  canvas.textAlign = oldTextAlign;
}

init();
