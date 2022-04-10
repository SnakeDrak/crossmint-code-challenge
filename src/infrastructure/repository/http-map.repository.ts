import { RequestInfo, RequestInit, Response } from 'node-fetch';
import AstralInterface from '../../domain/astrals/astral.interface';
import ConfigInterface from '../core/config.interface';
import LoggerInterface from '../core/logger.interface';
import couldBePartial from '../utils/could-be-partial.function';
import CurrentMapResponseInterface from './current-map-response.interface';
import GoalMapResponseInterface from './goal-map-response.interface';
import MapRepositoryInterface from './map-repository.interface';

class HttpMapRepository implements MapRepositoryInterface {
  constructor(
    private config: ConfigInterface,
    private fetcher: (url: RequestInfo, init?: RequestInit) => Promise<Response>,
    private logger: LoggerInterface,
  ) {}

  async findCurrentMap(): Promise<CurrentMapResponseInterface | null> {
    try {
      const { candidateId, apiURL } = this.getConfigParams();
      const req = await this.fetcher(new URL(`map/${candidateId}`, apiURL).toString());
      const res = await req.json();

      return this.isCurrentMap(res) ? res : null;
    } catch (e) {
      this.logger.warn(`[${this.constructor.name}] Issue receiving the map: ${e.toString()}`);
      return null;
    }
  }

  async findGoalMap(): Promise<GoalMapResponseInterface | null> {
    try {
      const { candidateId, apiURL } = this.getConfigParams();
      const req = await this.fetcher(new URL(`map/${candidateId}/goal`, apiURL).toString());
      const res = await req.json();

      return this.isGoalMap(res) ? res : null;
    } catch (e) {
      this.logger.warn(`[${this.constructor.name}] Issue receiving the goal map: ${e.toString()}`);
      return null;
    }
  }

  async addAstral(astral: AstralInterface) {
    return this.editAstral('add', astral);
  }

  async deleteAstral(astral: AstralInterface) {
    return this.editAstral('delete', astral);
  }

  private async editAstral(action: 'add' | 'delete', astral: AstralInterface): Promise<boolean> {
    const { candidateId, apiURL } = this.getConfigParams();
    const { row, column } = astral.getPosition();

    this.logger.print(
      `[${this.constructor.name}] ${
        action === 'add' ? 'Adding' : 'Deleting'
      } astral (${row}, ${column}).`,
    );

    try {
      const body = astral.toJSON();
      const req = await this.fetcher(new URL(`${astral.getPluralName()}`, apiURL).toString(), {
        method: action === 'add' ? 'post' : 'delete',
        body: JSON.stringify({
          candidateId,
          ...(body as {}),
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      return req.status === 200;
    } catch (e) {
      this.logger.warn(`[${this.constructor.name}] Issue editing the map: ${e.toString()}`);
      return false;
    }
  }

  private isGoalMap(response: unknown): response is GoalMapResponseInterface {
    return couldBePartial<GoalMapResponseInterface>(response) && response.goal instanceof Array;
  }

  private isCurrentMap(response: unknown): response is CurrentMapResponseInterface {
    return (
      couldBePartial<CurrentMapResponseInterface>(response) && typeof response.map === 'object'
    );
  }

  private getConfigParams(): { candidateId: string; apiURL: string } {
    const candidateId = this.config.get('CANDIDATE_ID');

    if (typeof candidateId !== 'string' || !candidateId)
      throw new Error(`[${this.constructor.name}] CANDIDATE_ID has to be defined!`);

    const apiURL = this.config.get('API_URL');

    if (typeof apiURL !== 'string' || !apiURL)
      throw new Error(`[${this.constructor.name}] API_URL has to be defined!`);

    return {
      candidateId,
      apiURL,
    };
  }
}

export default HttpMapRepository;
