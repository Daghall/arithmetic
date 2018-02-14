import {colors} from "./constants.js";

export default function drawSquares(canvas, arithmetic, properties) {
  const top = 220;
  const squareSize = 15;
  const squareSpace = 20;

  switch (arithmetic.operation) {
    case "+": {
      const left = properties.center - 9 * squareSpace;

      canvas.fillStyle = colors.left;
      for (let i = 0; i < arithmetic.operands.left; ++i) {
        canvas.fillRect(left + i * squareSpace, top, squareSize, squareSize);
      }

      canvas.fillStyle = colors.right;
      for (let i = 0; i < arithmetic.operands.right; ++i) {
        canvas.fillRect(left + (arithmetic.operands.left * squareSpace) + i * squareSpace, top, squareSize, squareSize);
      }
      break;
    }
    case "−": {
      const left = properties.center + Math.floor((squareSpace - squareSize) / 2);
      const leftSquares = arithmetic.operands.left - arithmetic.operands.right;
      const rightSquares = (leftSquares > 0) ? arithmetic.operands.right : arithmetic.operands.right + leftSquares;

      if (leftSquares > 0) {
        canvas.fillStyle = colors.left;
        for (let i = 0; i < leftSquares; ++i) {
          canvas.fillRect(left + i * squareSpace, top, squareSize, squareSize);
        }
      } else {
        canvas.fillStyle = colors.right;
        for (let i = 0; i < Math.abs(leftSquares); ++i) {
          canvas.fillRect(left - (i + 1) * squareSpace, top, squareSize, squareSize);
        }
      }

      canvas.fillStyle = colors.leftBlank;
      for (let i = 0; i < rightSquares; ++i) {
        canvas.fillRect(left + (Math.max(0, leftSquares) * squareSpace) + i * squareSpace, top, squareSize, squareSize);
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
