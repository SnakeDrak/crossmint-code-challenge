import MapRepositoryInterface from '../infrastructure/repository/map-repository.interface';
import MapAdapter from '../domain/map.adapter';
import UseCaseInterface from '../infrastructure/core/usecase.interface';
import AstralInterface from '../domain/astrals/astral.interface';
import ConfigInterface from '../infrastructure/core/config.interface';
import sleep from '../infrastructure/utils/sleep.function';
import isNumber from '../infrastructure/utils/is-number.function';

class SyncMapUseCase implements UseCaseInterface {
  private sleepBetweenRequests: number = 200;

  constructor(
    private mapRepository: MapRepositoryInterface,
    private mapAdapter: MapAdapter,
    private config: ConfigInterface,
  ) {
    const timeBetweenRequests = this.config.get('TIME_BETWEEN_REQUESTS');

    if (isNumber(timeBetweenRequests)) this.sleepBetweenRequests = Number(timeBetweenRequests);
  }

  async execute(): Promise<void> {
    const current = this.mapAdapter.getCurrentMap(await this.mapRepository.findCurrentMap());
    const goal = this.mapAdapter.getGoalMap(await this.mapRepository.findGoalMap());
    const currentCoords = current.getCoords();

    for (const [rowN, row] of goal.getCoords().entries()) {
      for (const [columnN, astral] of row.entries()) {
        if (currentCoords[rowN] && typeof currentCoords[rowN][columnN] !== 'undefined') {
          const currentAstral = currentCoords[rowN][columnN];
          if (!this.isAstralEqual(astral, currentAstral)) {
            if (astral === null)
              await this.mapRepository.deleteAstral(currentAstral as AstralInterface);
            else await this.mapRepository.addAstral(astral);

            if (this.sleepBetweenRequests) await sleep(this.sleepBetweenRequests);
          }
        } else
          throw new Error(
            `[${this.constructor.name}] Cannot sync the map! They don't have the same size.`,
          );
      }
    }
  }

  private isAstralEqual(first: AstralInterface | null, second: AstralInterface | null) {
    if (first === second) return true;

    return first?.equals(second);
  }
}

export default SyncMapUseCase;
