import DictionaryInterface from '../../infrastructure/utils/dictionary.interface';
import AstralsArray from '../astrals.array';
import AstralInterface from './astral.interface';

class AstralFactory {
  public getAstralFromJSON(
    obj: { type: number } & DictionaryInterface<unknown>,
  ): AstralInterface | null {
    const astralClass = AstralsArray.find((astral) => {
      const instance = new astral();

      return instance.getType() === Number(obj.type);
    });

    if (!astralClass) return null;

    const ins = new astralClass();

    return ins.fromJSON(obj);
  }

  public getAstralFromString(id: string): AstralInterface | null {
    let [prop, type] = id.split('_').map((v) => v.toLowerCase());
    if (!type) [type, prop] = [prop, type];

    const astralClass = AstralsArray.find((astral) => {
      const instance = new astral();

      return instance.getName() === type;
    });

    if (!astralClass) return null;

    return new astralClass(prop);
  }
}

export default AstralFactory;
