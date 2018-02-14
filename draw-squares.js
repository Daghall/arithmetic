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
      if (arithmetic.getResult() === 0) return;

      const left = properties.center - Math.floor((9 * squareSpace) / 2);

      // Left squares
      canvas.fillStyle = colors.left;
      for (let i = 0; i < arithmetic.operands.left; ++i) {
        canvas.fillRect(left + i * squareSpace, top, squareSize, squareSize);
      }

      // Shared square
      canvas.moveTo(left, top);
      canvas.lineTo(left, top + squareSize);
      canvas.lineTo(left + squareSize, top + squareSize);
      canvas.moveTo(left, top);
      canvas.fillStyle = colors.right;
      canvas.fill();

      // Right squares
      for (let i = 1; i < arithmetic.operands.right; ++i) {
        canvas.fillRect(left, top + i * squareSpace, squareSize, squareSize);
      }

      // Combined squares
      canvas.beginPath();
      for (let i = 1; i < arithmetic.operands.left; ++i) {
        for (let j = 1; j < arithmetic.operands.right; ++j) {
          canvas.rect(left + i * squareSpace, top + j * squareSpace, squareSize, squareSize);
        }
      }
      const gradient = canvas.createLinearGradient(
        left + arithmetic.operands.left * squareSpace,
        top + squareSpace,
        left + squareSpace,
        top + arithmetic.operands.right * squareSpace,
      );

      gradient.addColorStop(0, colors.left);
      gradient.addColorStop(1, colors.right);

      canvas.fillStyle = gradient;
      canvas.fill();

      break;
    }
    case "÷": {
      break;
    }
  }
}
