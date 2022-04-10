import couldBePartial from '../../infrastructure/utils/could-be-partial.function';
import AstralEntity from './astral.entity';
import AstralInterface from './astral.interface';
import DirectableInterface from './directable.interface';
import DirectionType from './direction.type';

class ComethEntity extends AstralEntity implements DirectableInterface {
  constructor(private direction: DirectionType) {
    super();
  }

  getName(): string {
    return 'cometh';
  }

  getPluralName(): string {
    return 'comeths';
  }

  getType(): number {
    return 2;
  }

  getDirection(): DirectionType {
    return this.direction;
  }

  setDirection(direction: DirectionType): void {
    this.direction = direction;
  }

  equals(compareWith: AstralInterface | null): boolean {
    return (
      super.equals(compareWith) &&
      this.isDirectable(compareWith) &&
      compareWith.getDirection() === this.getDirection()
    );
  }

  private isDirectable(
    astral: AstralInterface | null,
  ): astral is AstralInterface & DirectableInterface {
    return (
      couldBePartial<DirectableInterface>(astral) && typeof astral.getDirection !== 'undefined'
    );
  }

  toJSON() {
    return {
      row: this.getPosition().row,
      column: this.getPosition().column,
      direction: this.getDirection(),
    };
  }

  fromJSON(obj: unknown): ComethEntity {
    if (couldBePartial<{ direction: DirectionType }>(obj) && this.isValidDirection(obj.direction)) {
      this.setDirection(obj.direction);
    }

    return this;
  }

  private isValidDirection(color: unknown): color is DirectionType {
    return typeof color === 'string' && ['up','down','right','left'].includes(color);
  }
}

export default ComethEntity;
