export default function divide(left, right) {
  if (left % right === 0) {
    return left / right;
  }

  const result = {
    integer: Math.floor(left / right),
    numerator: left % right,
    denominator: right,
  };

  if (result.denominator % result.numerator === 0) {
    result.denominator /= result.numerator;
    result.numerator = 1;
  }

  return result;
}
