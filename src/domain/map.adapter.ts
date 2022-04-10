import CurrentMapResponseInterface from '../infrastructure/repository/current-map-response.interface';
import GoalMapResponseInterface from '../infrastructure/repository/goal-map-response.interface';
import AstralFactory from './astrals/astral.factory';
import AstralInterface from './astrals/astral.interface';
import CoordsType from './coords.type';
import MapEntity from './map.entity';

class MapAdapter {
  constructor(private astralFactory: AstralFactory) {}

  getCurrentMap(mapRes: CurrentMapResponseInterface | null): MapEntity {
    if (!mapRes) throw new Error(`[${this.constructor.name}] Not received a valid current map!`);

    return this.parseIncomingMap(mapRes.map.content);
  }

  getGoalMap(mapRes: GoalMapResponseInterface | null): MapEntity {
    if (!mapRes) throw new Error(`[${this.constructor.name}] Not received a valid goal map!`);

    return this.parseIncomingMap(mapRes.goal);
  }

  private parseIncomingMap(
    originalMap: CurrentMapResponseInterface['map']['content'] | GoalMapResponseInterface['goal'],
  ) {
    const coords: CoordsType = [];

    originalMap.forEach((originalRow, rowN) => {
      const row: (AstralInterface | null)[] = [];
      originalRow.forEach((originalColumn, colN) => {
        let astral: AstralInterface | null = null;

        if (originalColumn !== null)
          astral =
            typeof originalColumn === 'string'
              ? this.astralFactory.getAstralFromString(originalColumn)
              : this.astralFactory.getAstralFromJSON(originalColumn);

        if (astral) astral.setPosition({ row: rowN, column: colN });

        row.push(astral);
      });

      coords.push(row);
    });

    const map = new MapEntity();
    map.setCoords(coords);

    return map;
  }
}

export default MapAdapter;
