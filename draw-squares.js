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
