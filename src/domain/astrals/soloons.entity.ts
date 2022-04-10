import couldBePartial from '../../infrastructure/utils/could-be-partial.function';
import AstralEntity from './astral.entity';
import AstralInterface from './astral.interface';
import ColorableInterface from './colorable.interface';

type ColorType = 'blue' | 'red' | 'purple' | 'white';
class SoloonsEntity extends AstralEntity implements ColorableInterface {
  constructor(private color: ColorType) {
    super();
  }

  getName(): string {
    return 'soloon';
  }

  getPluralName(): string {
    return 'soloons';
  }

  getType(): number {
    return 1;
  }

  getColor(): string {
    return this.color;
  }

  setColor(color: ColorType): void {
    this.color = color;
  }

  equals(compareWith: AstralInterface | null): boolean {
    return (
      super.equals(compareWith) &&
      this.isColorable(compareWith) &&
      compareWith.getColor() === this.getColor()
    );
  }

  private isColorable(
    astral: AstralInterface | null,
  ): astral is AstralInterface & ColorableInterface {
    return couldBePartial<ColorableInterface>(astral) && typeof astral.getColor !== 'undefined';
  }

  toJSON() {
    return {
      row: this.getPosition().row,
      column: this.getPosition().column,
      color: this.getColor(),
    };
  }

  fromJSON(obj: unknown): SoloonsEntity {
    if (couldBePartial<{ color: ColorType }>(obj) && this.isValidColor(obj.color)) {
      this.setColor(obj.color);
    }

    return this;
  }

  private isValidColor(color: unknown): color is ColorType {
    return typeof color === 'string' && ['blue', 'red', 'purple', 'white'].includes(color);
  }
}

export default SoloonsEntity;
