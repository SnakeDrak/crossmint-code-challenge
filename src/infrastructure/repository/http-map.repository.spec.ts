import ConfigInterface from '../core/config.interface';
import CurrentMapResponseInterface from './current-map-response.interface';
import GoalMapResponseInterface from './goal-map-response.interface';
import HttpMapRepository from './http-map.repository';

class MockConfig implements ConfigInterface {
  set(prop: string, value: unknown): void {}
  get(param: string) {
    switch (param) {
      case 'CANDIDATE_ID':
        return '1';
      case 'API_URL':
        return 'http://fake';
      default:
        return undefined;
    }
  }
}

const mockCurrentMap: CurrentMapResponseInterface = {
  map: {
    _id: '1',
    content: [[]],
    phase: 1,
  },
};

const mockGoalMap: GoalMapResponseInterface = {
  goal: [[]],
};

describe('httpMapRepository', () => {
  describe('testing to get the map', () => {
    it('should return valid maps', async () => {
      expect.hasAssertions();

      const fetcher = jest.fn((url: string) => {
        const response = url.indexOf('/goal') !== -1 ? mockGoalMap : mockCurrentMap;
        return { json: jest.fn(() => response) };
      });
      const mockConsole = {
        info: jest.fn(),
        debug: jest.fn(),
        print: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
      };

      const httpMapRepository = new HttpMapRepository(
        new MockConfig(),
        fetcher as any,
        mockConsole,
      );
      await expect(httpMapRepository.findCurrentMap()).resolves.toBe(mockCurrentMap);
      await expect(httpMapRepository.findGoalMap()).resolves.toBe(mockGoalMap);
    });
  });
});
