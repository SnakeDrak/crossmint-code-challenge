import LoggerInterface from '../core/logger.interface';

class ConsoleLogger implements LoggerInterface {
  constructor(private console: Console) {}

  debug(text: string): void {
    this.console.debug(text);
  }

  print(text: string): void {
    this.console.log(text);
  }

  info(text: string): void {
    this.console.info(text);
  }

  warn(text: string): void {
    this.console.warn(text);
  }

  error(text: string): void {
    this.console.error(text);
  }
}

export default ConsoleLogger;
