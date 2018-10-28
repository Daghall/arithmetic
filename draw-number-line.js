import {fonts, colors} from "./constants.js";
import divide from "./divide.js";

export default function drawNumberLine(canvas, arithmetic, properties) {
  const top = 200;
  canvas.strokeStyle = colors.default;
  canvas.lineWidth = 2;

  switch (arithmetic.operation) {
    case "+": {
      const stepSize = (properties.canvasWidth - 110) / 20 + canvas.lineWidth;
      canvas.font = fonts.numberLine;
      drawArrow(canvas, 50, top, properties.canvasWidth - 50, top, colors.default);

      // Numbers and vertical lines
      canvas.beginPath();
      for (let i = 0; i < 19; ++i) {
        canvas.moveTo(50 + i * stepSize, top - 5);
        canvas.lineTo(50 + i * stepSize, top + 5);
        canvas.stroke();

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
      canvas.font = fonts.numberLine;
      drawArrow(canvas, 50, top, properties.canvasWidth - 50, top, colors.default);
      drawArrow(canvas, 50, top, 50, top, colors.default);

      // Numbers and vertical lines
      canvas.beginPath();
      for (let i = -9; i < 10; ++i) {
        canvas.moveTo(properties.center + i * stepSize, top - 5);
        canvas.lineTo(properties.center + i * stepSize, top + 5);
        canvas.stroke();

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
      const result = arithmetic.getResult();

      canvas.font = fonts.numberLine;
      drawArrow(canvas, 50, top, properties.canvasWidth - 50, top, colors.default);

      // Zero result
      if (result === 0) {
        canvas.beginPath();
        canvas.moveTo(50, top - 5);
        canvas.lineTo(50, top + 5);
        canvas.stroke();
        canvas.fillText(0, 50, top + 20);
        return;
      }

      const stepSize = (properties.canvasWidth - 120) / arithmetic.operands.right;

      // Numbers and vertical lines
      for (let i = 0; i <= arithmetic.operands.right; ++i) {
        canvas.beginPath();
        canvas.strokeStyle = colors.default;
        canvas.moveTo(50 + i * stepSize, top - 5);
        canvas.lineTo(50 + i * stepSize, top + 5);
        canvas.stroke();

        if (i > 0) {
          drawCurve(canvas, 50 + (i - 1) * stepSize, top, 50 + i * stepSize, top, colors.left);
        }

        canvas.fillStyle = colors.default;
        canvas.fillText(i * arithmetic.operands.left, 50 + i * stepSize, top + 20);
      }

      break;
    }
    case "÷": {
      const result = arithmetic.getResult();

      drawArrow(canvas, 50, top, properties.canvasWidth - 50, top, colors.default);

      // Zero result
      if (result === 0) {
        canvas.beginPath();
        canvas.moveTo(50, top - 5);
        canvas.lineTo(50, top + 5);
        canvas.stroke();
        canvas.font = fonts.numberLine;
        canvas.fillText(0, 50, top + 20);
        return;
      }

      const stepSize = (properties.canvasWidth - 120) / arithmetic.operands.right;

      // Left number
      drawCurve(canvas, 50, top, 50 + arithmetic.operands.right * stepSize, top, colors.left);

      // Numbers and vertical lines
      for (let i = arithmetic.operands.right; i >= 0; --i) {
        canvas.beginPath();
        canvas.strokeStyle = colors.default;
        canvas.moveTo(50 + i * stepSize, top - 5);
        canvas.lineTo(50 + i * stepSize, top + 5);
        canvas.stroke();

        if (i > 0) {
          drawCurve(canvas, 50 + i * stepSize, top, 50 + (i - 1) * stepSize, top, colors.right, true);
        }

        const stepResult = divide(i * arithmetic.operands.left, arithmetic.operands.right);
        let integerDrawn = false;
        canvas.font = fonts.numberLine;
        canvas.fillStyle = colors.default;

        // Draw integer part of result
        if (typeof stepResult !== "object" || stepResult.integer) {
          integerDrawn = true;
          canvas.fillText(stepResult.integer || stepResult, 50 + (i * stepSize), top + 50);
        }

        if (stepResult.denominator !== stepResult.numerator) {
          // Fraction divider
          canvas.strokeStyle = colors.default;
          canvas.lineWidth = 1; // TODO: contants
          canvas.beginPath();
          canvas.moveTo(50 + i * stepSize + (integerDrawn ? 10 : 0) - 4, top + 46);
          canvas.lineTo(50 + i * stepSize + (integerDrawn ? 10 : 0) + 4, top + 46);
          canvas.stroke();
          canvas.lineWidth = 2; // TODO: contants

          // Numbers
          canvas.font = fonts.numberLineFraction;
          canvas.fillText(stepResult.numerator || stepResult, 50 + i * stepSize + (integerDrawn ? 10 : 0), top + 43);
          canvas.fillText(stepResult.denominator || stepResult, 50 + i * stepSize + (integerDrawn ? 10 : 0), top + 55);
        }
      }

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
    canvas.lineTo(toX, toY);
  } else {
    canvas.moveTo(toX, toY);
    canvas.lineTo(toX - 5, toY - 5);
    canvas.lineTo(toX + 5, toY - 5);
    canvas.lineTo(toX, toY);
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
