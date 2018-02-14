export default function divide(left, right) {
  if (left % right === 0) {
    return left / right;
  }

  const result = {
    integer: Math.floor(left / right),
    numerator: left % right,
    denominator: right,
  };

  let gcd = 0;

  for (let i = 1; i <= Math.min(result.numerator, result.denominator - result.numerator); ++i) {
    if (result.numerator % i === 0 && result.denominator % i === 0) {
      gcd = i;
    }
  }

  if (gcd > 0) {
    result.denominator /= gcd;
    result.numerator /= gcd;
  }

  return result;
}
