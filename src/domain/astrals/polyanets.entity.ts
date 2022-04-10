import AstralEntity from './astral.entity';

class PolyanetsEntity extends AstralEntity {
  getType(): number {
    return 0;
  }

  getName(): string {
    return 'polyanet';
  }

  getPluralName(): string {
    return 'polyanets';
  }

  fromJSON(obj: unknown): PolyanetsEntity {
    return this;
  }
}

export default PolyanetsEntity;
