import DirectionType from './direction.type';

interface DirectableInterface {
  getDirection(): DirectionType;
  setDirection(direction: DirectionType): void;
}

export default DirectableInterface;
