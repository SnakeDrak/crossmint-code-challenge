import CoordsType from './coords.type';

class MapEntity {
  private coords: CoordsType;

  getCoords() {
    return this.coords;
  }

  setCoords(coords: CoordsType) {
    this.coords = coords;
  }
}

export default MapEntity;
