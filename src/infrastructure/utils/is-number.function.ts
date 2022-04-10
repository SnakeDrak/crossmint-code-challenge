function isNumber(x: unknown): x is number {
  return !Number.isNaN(Number(x));
}

export default isNumber;
