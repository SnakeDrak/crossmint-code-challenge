import UseCaseInterface from "./usecase.interface";

interface InitializableInterface {
  initialize(useCases: UseCaseInterface[]): Promise<boolean>;
  terminate(): Promise<boolean>;
}

export default InitializableInterface;
