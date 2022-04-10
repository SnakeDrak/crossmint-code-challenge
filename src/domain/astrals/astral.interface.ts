import SerializableInterface from '../../infrastructure/core/serializable.interface';
import EquatableInterface from '../../infrastructure/core/equatable.interface';
import LocationInterface from '../location.interface';

interface AstralInterface
  extends EquatableInterface<AstralInterface | null>,
    SerializableInterface<AstralInterface> {
  getName(): string;
  getPluralName(): string;
  getPosition(): LocationInterface;
  getType(): number;
  setPosition(position: LocationInterface): void;
}

export default AstralInterface;
