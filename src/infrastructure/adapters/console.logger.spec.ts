import ConsoleLogger from './console.logger';

describe('consoleLogger', () => {
  describe('testing logs', () => {
    it('should call the console commands', () => {
      expect.assertions(5);

      const debug = jest.spyOn(console, 'debug').mockImplementation();
      const log = jest.spyOn(console, 'log').mockImplementation();
      const info = jest.spyOn(console, 'info').mockImplementation();
      const warn = jest.spyOn(console, 'warn').mockImplementation();
      const error = jest.spyOn(console, 'error').mockImplementation();

      const logger = new ConsoleLogger(console);

      logger.debug('test1');
      expect(debug).toHaveBeenLastCalledWith('test1');
      logger.print('test2');
      expect(log).toHaveBeenLastCalledWith('test2');
      logger.info('test3');
      expect(info).toHaveBeenLastCalledWith('test3');
      logger.warn('test4');
      expect(warn).toHaveBeenLastCalledWith('test4');
      logger.error('test5');
      expect(error).toHaveBeenLastCalledWith('test5');

      debug.mockRestore();
      log.mockRestore();
      info.mockRestore();
      warn.mockRestore();
      error.mockRestore();
    });
  });
});
