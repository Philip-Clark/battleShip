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
      if (shipInCell(cell.coords, ship).boolean) valid = false;
    });

    if (valid) {
      cells = cells.filter((el) => el.value !== ship);
      cells.push.apply(cells, shipsCoords);
      if (ships.filter((el) => el === ship) == undefined) ships.push(ship);
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

  const shipInCell = (coord, ignore) => {
    cells = cells.filter((el) => el.value !== ignore);
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

  const getSize = () => {
    return size;
  };

  const getRandomizedBoard = (ships) => {
    let dataOut = [];
    ships.forEach((ship) => {
      while (true) {
        const origin = {
          x: Math.round(Math.random() * getSize()),
          y: Math.round(Math.random() * getSize()),
        };
        const rotation = Math.round(Math.random()) == 0 ? 'vert' : 'hori';
        if (!placeShip(ship, origin, rotation)) continue;
        dataOut.push({ ship, origin, rotation });
        break;
      }
    });

    return dataOut;
  };

  return { placeShip, isFleetSunk, shoot, getSize, getRandomizedBoard };
};

module.exports = GameBoard;
