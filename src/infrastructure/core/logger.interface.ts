interface LoggerInterface {
  debug(text: string): void;
  print(text: string): void;
  info(text: string): void;
  warn(text: string): void;
  error(text: string): void;
}

export default LoggerInterface;
