function couldBePartial<Type>(obj: unknown): obj is Partial<Record<keyof Type, unknown>> {
  return typeof obj === 'object' && obj !== null;
}

export default couldBePartial;
