import EnvConfig from './env.config';

describe('envConfig', () => {
  describe('testing some props', () => {
    it('should return the correct values', () => {
      expect.assertions(2);

      process.env.SAMPLE = 'it works';
      process.env.SAMPLE2 = 'it works too';

      const config = new EnvConfig();

      expect(config.get('SAMPLE')).toBe('it works');
      expect(config.get('SAMPLE2')).toBe('it works too');
    });
  });
});
