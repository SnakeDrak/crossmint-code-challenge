interface ClassTypeInterface<T> extends Function {
  new (...args: unknown[]): T;
}

export default ClassTypeInterface;
