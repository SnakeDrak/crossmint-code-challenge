import AstralInterface from '../../domain/astrals/astral.interface';
import CurrentMapResponseInterface from './current-map-response.interface';
import GoalMapResponseInterface from './goal-map-response.interface';

interface MapRepositoryInterface {
  findCurrentMap(): Promise<CurrentMapResponseInterface | null>;
  findGoalMap(): Promise<GoalMapResponseInterface | null>;
  addAstral(astral: AstralInterface): Promise<boolean>;
  deleteAstral(astral: AstralInterface): Promise<boolean>;
}

export default MapRepositoryInterface;
