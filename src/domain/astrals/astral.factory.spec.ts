import AstralFactory from '../../domain/astrals/astral.factory';

describe('AstralFactory', () => {
  describe('testing factory', () => {
    it('getting from json', async () => {
      expect.hasAssertions();

      const factory = new AstralFactory();

      expect(factory.getAstralFromJSON({ type: 0 })?.getType()).toBe(0);
      expect(factory.getAstralFromJSON({ type: 1, color: 'blue' })?.getType()).toBe(1);
      expect(factory.getAstralFromJSON({ type: 2, direction: 'up' })?.getType()).toBe(2);
      expect(factory.getAstralFromJSON({ type: 0 })?.getName()).toBe('polyanet');
      expect(factory.getAstralFromJSON({ type: 1, color: 'red' })?.getName()).toBe('soloon');
      expect(factory.getAstralFromJSON({ type: 2, direction: 'down' })?.getName()).toBe('cometh');
    });

    it('getting from string', async () => {
      expect.hasAssertions();
      const factory = new AstralFactory();

      expect(factory.getAstralFromString('UP_COMETH')?.getName()).toBe('cometh');
      expect((factory.getAstralFromString('UP_COMETH') as any).getDirection()).toBe('up');

      expect(factory.getAstralFromString('RED_SOLOON')?.getName()).toBe('soloon');
      expect((factory.getAstralFromString('RED_SOLOON') as any).getColor()).toBe('red');
    });
  });
});
