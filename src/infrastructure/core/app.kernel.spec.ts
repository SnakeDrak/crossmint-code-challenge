import AppKernel from './app.kernel';
import InitializableInterface from './initializable.interface';

class MockInfrastructure implements InitializableInterface {
  initialize(): Promise<boolean> {
    return Promise.resolve(true);
  }

  terminate(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

describe('appKernel', () => {
  describe('run the app', () => {
    it('should initialize and terminate the APP', async () => {
      expect.hasAssertions();

      const mock = new MockInfrastructure();
      const mockConsole = {
        info: jest.fn(),
        debug: jest.fn(),
        print: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
      };
      const spyInit = jest.spyOn(mock, 'initialize').mockImplementation();
      const spyTerminate = jest.spyOn(mock, 'initialize').mockImplementation();

      const app = new AppKernel([mock], mockConsole as any);
      await app.initialize();
      expect(spyInit).toHaveBeenCalledTimes(1);
      await app.terminate();
      expect(spyTerminate).toHaveBeenCalledTimes(1);
    });
  });
});
