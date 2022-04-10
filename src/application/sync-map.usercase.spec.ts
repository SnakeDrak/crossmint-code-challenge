import EnvConfig from '../infrastructure/adapters/env.config';
import AstralFactory from '../domain/astrals/astral.factory';
import MapAdapter from '../domain/map.adapter';
import SyncMapUseCase from './sync-map.usecase';

describe('SyncMapUseCase', () => {
  describe('testing use case', () => {
    const mockCurrent = {
      map: {
        content: [
          [null, null],
          [{ type: 0 }, null],
        ],
      },
    };

    const mockGoal = {
      goal: [
        ['SPACE', 'SPACE'],
        ['POLYANET', 'SPACE'],
      ],
    };

    it('not call to the repository because no changes', async () => {
      expect.assertions(2);
      const findCurrentMap = jest.fn(() => mockCurrent);
      const findGoalMap = jest.fn(() => mockGoal);
      const addAstral = jest.fn();
      const deleteAstral = jest.fn();
      const mapRepository = { findCurrentMap, findGoalMap, addAstral, deleteAstral };

      const useCase = new SyncMapUseCase(
        mapRepository as any,
        new MapAdapter(new AstralFactory()),
        new EnvConfig(),
      );
      await useCase.execute();

      expect(addAstral).toHaveBeenCalledTimes(0);
      expect(deleteAstral).toHaveBeenCalledTimes(0);
    });

    it('call to the repository correctly', async () => {
      expect.hasAssertions();
      const findCurrentMap = jest.fn(() => mockCurrent);
      const findGoalMap = jest.fn(() => mockGoal);
      const addAstral = jest.fn();
      const deleteAstral = jest.fn();
      const mapRepository = { findCurrentMap, findGoalMap, addAstral, deleteAstral };

      const useCase = new SyncMapUseCase(
        mapRepository as any,
        new MapAdapter(new AstralFactory()),
        new EnvConfig(),
      );

      mockGoal.goal[0][1] = 'POLYANET';
      await useCase.execute();

      expect(addAstral).toHaveBeenCalledTimes(1);
      expect(deleteAstral).toHaveBeenCalledTimes(0);

      mockGoal.goal[1][0] = 'SPACE';
      await useCase.execute();

      expect(addAstral).toHaveBeenCalledTimes(2);
      expect(deleteAstral).toHaveBeenCalledTimes(1);

      mockGoal.goal[0][0] = 'RED_SOLOON';
      await useCase.execute();

      expect(addAstral).toHaveBeenCalledTimes(4);
      expect(deleteAstral).toHaveBeenCalledTimes(2);

      mockGoal.goal[1][1] = 'UP_COMETH';
      await useCase.execute();

      expect(addAstral).toHaveBeenCalledTimes(7);
      expect(deleteAstral).toHaveBeenCalledTimes(3);

      mockGoal.goal = [
        ['UP_COMETH', 'RED_SOLOON'],
        ['BLUE_SOLOON', 'POLYANET'],
      ];
      await useCase.execute();

      expect(addAstral).toHaveBeenCalledTimes(11);
      expect(deleteAstral).toHaveBeenCalledTimes(3);
    });
  });
});
