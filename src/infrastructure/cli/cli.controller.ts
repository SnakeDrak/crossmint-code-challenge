import InitializableInterface from '../core/initializable.interface';
import LoggerInterface from '../core/logger.interface';
import UseCaseInterface from '../core/usecase.interface';

class CLIController implements InitializableInterface {
  private useCases: UseCaseInterface[];

  constructor(private logger: LoggerInterface) {}

  initialize(theUseCases: UseCaseInterface[]): Promise<boolean> {
    this.useCases = theUseCases;

    const paramIndex = process.argv.indexOf('-u');
    if (paramIndex !== -1) {
      const useCasesSelected = process.argv[paramIndex + 1]
        .split(',')
        .map((v) => v.toLowerCase().trim());

      const useCases = this.useCases.filter((useCase) =>
        useCasesSelected.includes(useCase.constructor.name.toLowerCase()),
      );

      if (!useCases.length) this.printHelp();
      else useCases.forEach(this.executeUseCase.bind(this));
    } else this.printHelp();

    return Promise.resolve(true);
  }

  terminate(): Promise<boolean> {
    return Promise.resolve(true);
  }

  printHelp() {
    process.stdout.write(
      `Usage: ${process.argv[0]} ${process.argv[1]} -u ${this.getUseCaseNames().join(',')}\n`,
    );
  }

  private getUseCaseNames() {
    return this.useCases.map((c) => c.constructor.name);
  }

  private async executeUseCase(useCase: UseCaseInterface) {
    try {
      await useCase.execute();
      this.logger.info(
        `[${this.constructor.name}] Use case ${useCase.constructor.name} processed correctly.`,
      );
    } catch (e) {
      this.logger.error(
        `[${this.constructor.name}] Error processing ${
          useCase.constructor.name
        } use case! ${e.toString()}`,
      );
    }
  }
}

export default CLIController;
