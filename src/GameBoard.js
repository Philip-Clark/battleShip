const GameBoard = (s) => {
  const size = s;
  let cells = [];
  let ships = [];

  const placeShip = (ship, origin, rotation) => {
    let shipsCoords = [];
    let length = ship.getSize();
    let valid = true;
    [...Array(length).keys()].forEach((i) => {
      if (rotation == 'vert')
        shipsCoords.push({ value: ship, coords: { x: origin.x, y: origin.y + i } });
      else shipsCoords.push({ value: ship, coords: { x: origin.x + i, y: origin.y } });
    });

    shipsCoords.forEach((cell) => {
      valid = isValidCoord(cell.coords) ? valid : false;
      if (shipInCell(cell.coords).boolean) valid = false;
    });

    if (valid) {
      cells.push.apply(cells, shipsCoords);
      ships.push(ship);
    }
    return valid;
  };

  const shoot = (coord) => {
    const cell = shipInCell(coord);
    if (cell.boolean) cell.ship.value.hit();
    return cell.boolean;
  };

  const isValidCoord = (coord) => {
    if (coord.x >= size) return false;
    if (coord.y >= size) return false;
    if (coord.x < 0) return false;
    return coord.y >= 0;
  };

  const shipInCell = (coord) => {
    const ship = cells.find((cell) => cell.coords.x == coord.x && cell.coords.y == coord.y);

    return { boolean: ship != undefined, ship: ship };
  };

  const isFleetSunk = () => {
    let fleetSunk = true;
    ships.forEach((ship) => {
      if (!ship.isSunk()) fleetSunk = false;
    });
    return fleetSunk;
  };

  return { placeShip, isFleetSunk, shoot };
};

module.exports = GameBoard;
