const Ship = (size) => {
  let health = size;

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

  return { hit, getHealth, isSunk, getSize };
};
module.exports = Ship;
