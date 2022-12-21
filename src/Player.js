const Player = (enemyBoard) => {
  const attack = (coord) => {
    return enemyBoard.shoot(coord);
  };

  return { attack };
};

module.exports = Player;
