const Ship = (_size, _id) => {
  let health = _size;
  let size = _size;
  const id = _id;

  const hit = () => {
    health = health > 0 ? health - 1 : 0;
    return health;
  };

  const isSunk = () => {
    return health === 0;
  };

  const getSize = () => {
    return size;
  };
  const getHealth = () => {
    return health;
  };
  const getId = () => {
    return id;
  };

  return { hit, getHealth, isSunk, getSize, getId };
};
module.exports = Ship;
