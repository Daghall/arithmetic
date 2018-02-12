import {fonts, colors} from "./constants.js";

export default function drawNumberLine(canvas, arithmetic, properties) {
  const top = 150;
  canvas.strokeStyle = colors.default;
  canvas.lineWidth = 2;

  switch (arithmetic.operation) {
    case "+": {
      const stepSize = (properties.canvasWidth - 110) / 20 + canvas.lineWidth;
      drawArrow(canvas, 50, top, properties.canvasWidth - 50, top, colors.default);

      // Numbers and vertical lines
      canvas.beginPath();
      for (let i = 0; i < 19; ++i) {
        canvas.moveTo(50 + i * stepSize, top - 5);
        canvas.lineTo(50 + i * stepSize, top + 5);
        canvas.stroke();

        canvas.font = fonts.numberLine;
        canvas.fillText(i, 50 + i * stepSize, top + 20);
      }

      // Operands
      const leftLength = 50 + arithmetic.operands.left * stepSize;
      const rightLength = leftLength + arithmetic.operands.right * stepSize;

      if (arithmetic.operands.right) {
        drawCurve(canvas, leftLength, top, rightLength, top, colors.right);
      }

      if (arithmetic.operands.left) {
        drawCurve(canvas, 50, top, leftLength, top, colors.left);
      }
      break;
    }
    case "−": {
      const stepSize = (properties.canvasWidth - 110) / 20 + canvas.lineWidth;
      drawArrow(canvas, 50, top, properties.canvasWidth - 50, top, colors.default);
      drawArrow(canvas, 50, top, 50, top, colors.default);

      // Numbers and vertical lines
      canvas.beginPath();
      for (let i = -9; i < 10; ++i) {
        canvas.moveTo(properties.center + i * stepSize, top - 5);
        canvas.lineTo(properties.center + i * stepSize, top + 5);
        canvas.stroke();

        canvas.font = fonts.numberLine;
        canvas.fillText(i, properties.center + i * stepSize, top + 20);
      }

      // Operands
      const leftLength = properties.center + arithmetic.operands.left * stepSize;
      const rightLength = leftLength + arithmetic.operands.right * stepSize * -1;

      if (arithmetic.operands.left) {
        drawCurve(canvas, properties.center, top, leftLength, top, colors.left);
      }

      if (arithmetic.operands.right) {
        drawCurve(canvas, leftLength, top, rightLength, top, colors.right, true);
      }
      break;
    }
    case "×": {
      break;
    }
    case "÷": {
      break;
    }
  }
}

function drawCurve(canvas, fromX, fromY, toX, toY, color, negative) {
  const scale = negative ? 3 / 4 : 3 / 2;
  canvas.beginPath();
  canvas.strokeStyle = color;
  canvas.fillStyle = color;

  canvas.moveTo(fromX, fromY);
  canvas.bezierCurveTo(fromX, fromY / scale, toX, toY / scale, toX, toY);
  canvas.stroke();

  canvas.beginPath();

  // Awworhead
  if (negative) {
    canvas.moveTo(toX, toY);
    canvas.lineTo(toX - 5, toY + 5);
    canvas.lineTo(toX + 5, toY + 5);
  } else {
    canvas.moveTo(toX, toY);
    canvas.lineTo(toX - 5, toY - 5);
    canvas.lineTo(toX + 5, toY - 5);
  }
  canvas.fill();
}

function drawArrow(canvas, fromX, fromY, toX, toY, color) {
  const arrawAtEnd = toX > fromX;

  canvas.beginPath();
  canvas.strokeStyle = color;
  canvas.fillStyle = color;

  canvas.moveTo(fromX, fromY);
  canvas.lineTo(toX, toY);
  canvas.stroke();

  // Arrowhead
  canvas.beginPath();

  if (arrawAtEnd) {
    canvas.moveTo(toX, toY);
    canvas.lineTo(toX - 10, toY - 5);
    canvas.lineTo(toX - 10, toY + 5);
  } else {
    canvas.moveTo(fromX, fromY);
    canvas.lineTo(toX + 10, toY - 5);
    canvas.lineTo(toX + 10, toY + 5);
  }
  canvas.fill();
}
