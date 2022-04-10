import ClassTypeInterface from '../infrastructure/utils/class-type.interface';
import AstralInterface from './astrals/astral.interface';
import ComethEntity from './astrals/cometh.entity';
import PolyanetsEntity from './astrals/polyanets.entity';
import SoloonsEntity from './astrals/soloons.entity';

const AstralsArray: ClassTypeInterface<AstralInterface>[] = [
  PolyanetsEntity,
  SoloonsEntity,
  ComethEntity,
];

export default AstralsArray;
