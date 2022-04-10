import InitializableInterface from './initializable.interface';
import LoggerInterface from './logger.interface';
import UseCaseInterface from './usecase.interface';

class AppKernel {
  private useCases: UseCaseInterface[] = [];

  constructor(private infrastructures: InitializableInterface[], private logger: LoggerInterface) {}

  async initialize() {
    this.logger.info(`[${this.constructor.name}] Initializing the app...`);

    const promises: Promise<boolean>[] = [];

    this.infrastructures.forEach((i) => promises.push(i.initialize(this.useCases)));

    const values = await Promise.all(promises);
    if (values.some((v) => v === false)) return false;

    return true;
  }

  async terminate(): Promise<boolean> {
    this.logger.info(`[${this.constructor.name}] Terminating the app...`);

    const promises: Promise<boolean>[] = [];

    this.infrastructures.forEach((i) => promises.push(i.terminate()));

    const values = await Promise.all(promises);
    if (values.some((v) => v === false)) return false;

    return true;
  }

  addUseCase(useCase: UseCaseInterface){
    this.useCases.push(useCase);
  }
}

export default AppKernel;
