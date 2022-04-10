interface ConfigInterface {
  get(prop: string): unknown;
  set(prop: string, value: unknown): void;
}

export default ConfigInterface;
