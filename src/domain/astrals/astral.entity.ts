import LocationInterface from '../location.interface';
import AstralInterface from './astral.interface';

abstract class AstralEntity implements AstralInterface {
  private position: LocationInterface = { row: 0, column: 0 };

  getPosition() {
    return this.position;
  }

  setPosition(position: LocationInterface) {
    this.position = position;
  }

  equals(compareWith: AstralInterface | null) {
    return (
      compareWith !== null &&
      compareWith.getType() === this.getType() &&
      compareWith.getName() === this.getName()
    );
  }

  abstract getType(): number;
  abstract getName(): string;
  abstract getPluralName(): string;
  abstract fromJSON(obj: unknown): AstralEntity;

  toJSON(): LocationInterface {
    return {
      row: this.getPosition().row,
      column: this.getPosition().column,
    };
  }
}

export default AstralEntity;
